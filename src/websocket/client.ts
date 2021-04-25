import { serverWs } from '../app'
import { IConnection } from '../protocols/IConnection'
import { IUser } from '../protocols/IUser'
import { ConnectionsService } from '../services/ConnectionsService'
import { MessagesService } from '../services/MessagesService'
import { UsersService } from '../services/UsersService'

serverWs.on('connect', async socket => {
  const connectionService = new ConnectionsService()
  const usersService = new UsersService()
  const messagesService = new MessagesService()
  let user_id = ''

  socket.on('client_first_access', async params => {
    const { text, email } = params
    const userExists = await usersService.findByEmail(email)
    if (!userExists) {
      const newUser: IUser = { email: email }
      const user = await usersService.create(newUser)
      user_id = user.id
      const connection = { socket_id: socket.id, user_id: user.id }
      await connectionService.create(connection)
    } else {
      let connection: IConnection = await connectionService.findByUserId(userExists.id)
      user_id = userExists.id
      if (!connection) {
        connection = { socket_id: socket.id, user_id: userExists.id }
        await connectionService.create(connection)
      } else {
        connection.socket_id = socket.id
        await connectionService.create(connection)
      }
    }
    await messagesService.create({ user_id, text })
    const allMessages = await messagesService.listByEmail(email)
    socket.emit('client_list_all_messages', allMessages)
  })
  socket.on('client_send_to_admin', async params => {
    const { text, socket_admin_id } = params
    const socket_id = socket.id
    const { user_id } = await connectionService.findBySocketId(socket.id)
    const message = messagesService.create({ admin_id: socket_admin_id, user_id, text })
    serverWs.to('socket_admin_id').emit('admin_receive_message', {
      message,
      socket_id
    })
  })
})
