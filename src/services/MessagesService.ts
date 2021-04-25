import { getCustomRepository } from 'typeorm'
import { Message } from '../entities/Message'
import { IMessage } from '../protocols/IMessage'
import { IUser } from '../protocols/IUser'
import { MessagesRepository } from '../repositories/MessagesRepository'
import { UsersRepository } from '../repositories/UsersRepository'

class MessagesService {
  private messagesRepository: MessagesRepository

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }

  async create(message: IMessage): Promise<Message> {
    const newMessage: Message = this.messagesRepository.create(message)
    return this.messagesRepository.save(newMessage)
  }

  async listByUser(userEmail: string): Promise<Message[]> {
    const usersRepository = getCustomRepository(UsersRepository)
    const { id } = await usersRepository.findOne({ where: { email: userEmail } })
    return this.messagesRepository.find({ where: { user_id: id } })
  }
}

export { MessagesService }
