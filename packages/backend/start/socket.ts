import Ws from 'App/Services/Ws';
import SocketMiddleware from 'App/Middleware/Socket';
import type User from 'App/Models/User';
import { ISocket } from '@pokemon/service';
// import Rabbit from '@ioc:Adonis/Addons/Rabbit'

Ws.boot()

Ws.io.on('connection', async (socket: ISocket) => {
  await SocketMiddleware.middleWare(socket);

  socket.on('addPokemon', async (data, auth: User) => {
    console.log('data ->', data)
    console.log('auth. ->', auth)
    socket.emit('addPokemon', new Uint8Array(data))
    // await Rabbit.sendToQueue('my_queue', data)
  })
})