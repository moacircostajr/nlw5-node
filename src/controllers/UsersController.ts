import { User } from '../entities/User'
import { IUser } from '../protocols/IUser'
import { UsersService } from '../services/UsersService'

class UsersController {
  createNewUser(userRequest: IUser): Promise<User> {
    // validar e checar autorização
    const usersService = new UsersService()
    return usersService.create(userRequest)
  }
}

export { UsersController }
