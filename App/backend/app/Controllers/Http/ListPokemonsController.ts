import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import ListPokemonModel from 'App/Models/ListPokemon';

export default class ListPokemonsController {
  public async index({ request }: HttpContextContract) {
    const param = request.all();
    if (!param.generation) {
      const listPokemon = await Database.from('list_pokemon').orderBy('id', 'asc');
      return {
        data: listPokemon
      };
    }

    return await ListPokemonModel
      .query()
      .select('id', 'name', 'types', 'img', 'url')
      .where('generation', param.generation)
      .orderBy('id', 'asc');
  }

  public async show({ response, request }: HttpContextContract) {
    const param = request.all();
    if (param?.id) {
      const pokemon = await ListPokemonModel.findByOrFail('id', param.id);
      return {
        data: pokemon
      };
    }
    if (param?.name) {
      const pokemon = await Database.from('list_pokemon').whereLike('name', `%${param.name}%`).orderBy('id', 'asc');
      return {
        data: pokemon
      };
    }
    if (!param?.id || !param?.name) {
      return response.notFound({ message: 'pokemon not found' });
    }
  }
}
