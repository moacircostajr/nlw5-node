import { serverHttp } from './app'
import './websocket/client'
import './websocket/admin'

serverHttp.listen('3333', () => {
  console.log('Server is running on port 3333')
})
