import { Message } from '../entities/Message'
import { IMessage } from '../protocols/IMessage'
import { IUser } from '../protocols/IUser'
import { MessagesService } from '../services/MessagesService'

class MessagesController {
  createNewMessage(message: IMessage): Promise<Message> {
    // validar e checar autorização
    const messagesService = new MessagesService()
    return messagesService.create(message)
  }

  showByUser(email: string) {
    // validar e checar autorização
    const messagesService = new MessagesService()
    return messagesService.listByUser(email)
  }
}

export { MessagesController }
