import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import ListPokemonModel from "App/Models/ListPokemon";

export default class ListPokemonsController {
    public async index({ request }: HttpContextContract) {
        const param = request.all();
        if (!param.offset || !param.limit) {
            const listPokemon = await Database.from('list_pokemon').orderBy('id', 'asc');
            return {
                data: listPokemon
            }
        }
        return await Database.from('list_pokemon').orderBy('id', 'asc').paginate(1, 152)
    }
    public async show({ response, request }: HttpContextContract) {
        const param = request.all();
        if (param?.id) {
            const pokemon = await ListPokemonModel.findByOrFail('id', param.id);
            return {
                data: pokemon
            }
        }
        if (param?.name) {
            const pokemon = await Database.from('list_pokemon').whereLike('name', `%${param.name}%`).orderBy('id', 'asc');
            return {
                data: pokemon
            }
        }
        if (!param?.id || !param?.name) {
            return response.status(201)
        }
    }
}