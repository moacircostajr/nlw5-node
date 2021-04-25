import { Request, Response, Router } from 'express'
import { SettingsController } from './controllers/SettingsController'
import { ISetting } from './protocols/ISetting'
import 'express-async-errors'
import { UsersController } from './controllers/UsersController'
import { IUser } from './protocols/IUser'
import { MessagesController } from './controllers/MessagesController'
import { IMessage } from './protocols/IMessage'

const routes = Router()

routes.post('/settings', async (req: Request, res: Response) => {
  const settingsController = new SettingsController()
  const setting: ISetting = req.body
  const result = await settingsController.createNewSetting(setting)
  return res.status(201).json({ result })
})

routes.post('/users', async (req: Request, res: Response) => {
  const usersController = new UsersController()
  const user: IUser = req.body
  const result = await usersController.createNewUser(user)
  return res.status(201).json({ result })
})

routes.post('/messages', async (req: Request, res: Response) => {
  const messagesController = new MessagesController()
  const message: IMessage = req.body
  const result = await messagesController.createNewMessage(message)
  return res.status(201).json({ result })
})

routes.get('/messages/:email', async (req: Request, res: Response) => {
  const messagesController = new MessagesController()
  const { email } = req.params
  console.log(email)
  const result = await messagesController.showByUser(email)
  return res.status(201).json({ result })
})

export default routes
