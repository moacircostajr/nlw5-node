import app from './app'
import 'reflect-metadata'
import './database/connection'

app.listen('3333', () => {
  console.log('Server is running on port 3333')
})
