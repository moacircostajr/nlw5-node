import { getCustomRepository } from 'typeorm'
import { Connection } from '../entities/Connection'
import { IConnection } from '../protocols/IConnection'
import { ConnectionsRepository } from '../repositories/ConnectionsRepository'
import { UsersRepository } from '../repositories/UsersRepository'

class ConnectionsService {
  private connectionsRepository: ConnectionsRepository

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  async create(connection: IConnection): Promise<Connection> {
    const newConnection: Connection = this.connectionsRepository.create(connection)
    return this.connectionsRepository.save(newConnection)
  }

  async listByUser(userEmail: string): Promise<Connection[]> {
    const usersRepository = getCustomRepository(UsersRepository)
    const { id } = await usersRepository.findOne({ where: { email: userEmail } })
    return this.connectionsRepository.find({ where: { user_id: id } })
  }

  findByUserId(userId: string): Promise<Connection> {
    return this.connectionsRepository.findOne({ where: { user_id: userId } })
  }

  findBySocketId(socketId: string): Promise<Connection> {
    return this.connectionsRepository.findOne({ where: { socket_id: socketId } })
  }

  async findAllWithoutAdmin(): Promise<Connection[]> {
    return this.connectionsRepository.find({ where: { admin_id: null }, relations: ['user'] })
  }

  async updateAdminID(user_id: string, admin_id: string) {
    await this.connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where('user_id = :user_id', { user_id })
      .execute()
  }
}
export { ConnectionsService }
