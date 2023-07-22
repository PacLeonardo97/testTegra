import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import ListPokemon from 'App/Models/User';
import { v4 } from 'uuid';

export default class extends BaseSeeder {
  public async run() {
    try {
      await ListPokemon.create({ name: 'leonardo', password: '1234567890a@', email: 'leonardo@leonardo.com', id: v4() });
    } catch (error) {
      console.log('error ->', error);
    }
  }
}
