import routes from './routes'
import express, { Request, Response } from 'express'
import 'reflect-metadata'
import './database/connection'
import http from 'http'
import { Server, Socket } from 'socket.io'
import path from 'path'

const app = express()

app.use(express.json())
app.use(routes)

app.use(express.static(path.join(__dirname, '..', 'arquivo', 'public-2')))
app.set('views', path.join(__dirname, '..', 'arquivo', 'public-2'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/pages/client', (request: Request, response: Response) => {
  return response.render('html/client.html')
})

const serverHttp = http.createServer(app) // protocolo http
const serverWs = new Server(serverHttp) // protocolo WS trabalha junto com o http

serverWs.on('connection', (socket: Socket) => {
  console.log('se conectou', socket.id)
})

export { serverHttp, serverWs }
