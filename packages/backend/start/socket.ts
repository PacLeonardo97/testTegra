import Ws from 'App/Services/Ws';
import SocketMiddleware from 'App/Middleware/Socket';
import factoryError from 'App/Validators/helper';
import Rabbit from '@ioc:Adonis/Addons/Rabbit'

Ws.boot()

Ws.io.on('connection', async (socket) => {
  try {
    const user = await SocketMiddleware.run(socket);
    socket.emit('welcome', { email: user.email, name: user.name });
    socket.on('addPokemon', async (data) => {
      await Rabbit.sendToQueue('my_queue', data)
    })
  } catch (error) {
    if (typeof error === 'string') {
      return factoryError(error)
    }
  }
})