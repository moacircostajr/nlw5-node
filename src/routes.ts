import { Request, Response, Router } from 'express'
import SettingsController from './controllers/SettingsController'
import { ISetting } from './protocols/ISetting'

const routes = Router()

const settingsController = new SettingsController()

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'OLÁ NLW 05' })
})

routes.use('/settings', async (req: Request, res: Response) => {
  const setting: ISetting = req.body
  const result = await settingsController.createNewSetting(setting)
  res.status(201).json({ result })
})

export default routes
