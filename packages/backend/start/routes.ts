import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/listPokemon', 'ListPokemonsController.index');
  Route.get('/pokemon', 'ListPokemonsController.show');
  Route.resource('/user', 'usersController').except(['create', 'edit']);
  Route.post('/login', 'AuthController.login');
  Route.post('/logout', 'AuthController.logout').middleware('auth');
  Route.get('/mydex', 'MyDexesController.index').middleware('auth');
  Route.post('/mydex', 'MyDexesController.store').middleware('auth')
}).prefix('/api')
