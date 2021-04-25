import { serverWs } from '../app'
import { IConnection } from '../protocols/IConnection'
import { ConnectionsService } from '../services/ConnectionsService'
import { MessagesService } from '../services/MessagesService'

// socket envia diretamente pro usuario
serverWs.on('connect', async socket => {
  const connectionService = new ConnectionsService()
  const messagesService = new MessagesService()

  const allConnectionsWithoutAdmin: IConnection[] = await connectionService.findAllWithoutAdmin()
  serverWs.emit('admin_list_all_users', allConnectionsWithoutAdmin) // server envia para todos que estejam ouvindo o evento
  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { user_id } = params
    const allMessages = await messagesService.listByUser(user_id)
    callback(allMessages)
  })
  socket.on('admin_send_message', async params => {
    const { user_id, text } = params
    await messagesService.create({ admin_id: socket.id, user_id, text })

    const { socket_id } = await connectionService.findByUserId(user_id)

    serverWs.to(socket_id).emit('admin_send_to_client', {
      text,
      socket_id
    })
  })

  socket.on('admin_user_in_support', async params => {
    const { user_id } = params
    await connectionService.updateAdminID(user_id, socket.id)
    const allConnectionsWithoutAdmin: IConnection[] = await connectionService.findAllWithoutAdmin()
    serverWs.emit('admin_list_all_users', allConnectionsWithoutAdmin) // server envia para todos que estejam ouvindo o evento
  })
})
