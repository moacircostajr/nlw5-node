import { getCustomRepository } from 'typeorm'
import { User } from '../entities/User'
import { IUser } from '../protocols/IUser'
import { UsersRepository } from '../repositories/UsersRepository'

class UsersService {
  private usersRepository: UsersRepository

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository)
  }

  async create(user: IUser): Promise<User> {
    console.log('Criando usuário', user.email)
    const userExists = await this.usersRepository.findOne({ where: { email: user.email } })
    if (userExists) return userExists
    const newUser = new User()
    newUser.email = user.email
    return this.usersRepository.save(newUser)
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } })
  }
}

export { UsersService }
