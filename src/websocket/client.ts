import { serverWs } from '../app'
import { IConnection } from '../protocols/IConnection'
import { IUser } from '../protocols/IUser'
import { ConnectionsService } from '../services/ConnectionsService'
import { MessagesService } from '../services/MessagesService'
import { UsersService } from '../services/UsersService'

serverWs.on('connect', socket => {
  const connectionService = new ConnectionsService()
  const usersService = new UsersService()
  const messagesService = new MessagesService()

  socket.on('client_first_access', async params => {
    const { text, email } = params
    let user_id = ''
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
  })
})
