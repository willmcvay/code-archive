import * as express from 'express'
import * as http from 'http'
import * as socketServer from 'socket.io'

const sockets = http.createServer(express())

sockets.listen( 3000, () => {
  console.log('Socket server launched on port 300')
})

export const io = socketServer(sockets)
