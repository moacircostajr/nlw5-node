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
    const newUser = new User()
    newUser.email = user.email
    const userExists = await this.usersRepository.findOne({ where: { email: user.email } })
    if (userExists) return userExists
  }
}

export { UsersService }
