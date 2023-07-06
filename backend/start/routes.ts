import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
  Route.get('/listPokemon', 'ListPokemonsController.index');
  Route.get('/pokemon', 'ListPokemonsController.show');
}).prefix('/api')
