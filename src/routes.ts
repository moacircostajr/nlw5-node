import { Request, Response, Router } from 'express'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'OLÁ NLW 05' })
})

routes.post('/users', (req: Request, res: Response) => {
  return res.json({ message: 'Usuário salvo com sucesso!' })
})

export default routes
