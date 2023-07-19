import Ws from 'App/Services/Ws';
import SocketMiddleware from 'App/Middleware/Socket';
import type User from 'App/Models/User';
// import Rabbit from '@ioc:Adonis/Addons/Rabbit'

Ws.boot()

Ws.io.on('connection', async (socket) => {
  await SocketMiddleware.middleWare(socket);

  socket.on('addPokemon', async (data, auth: User) => {
    console.log('data ->', data, 'auth. ->', auth)
  })
})