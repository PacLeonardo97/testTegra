import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ListPokemon from 'App/Models/ListPokemon';
import { pokeApi } from '@pokemon/service';

export default class extends BaseSeeder {
  count = 0;

  private async create(generation: number) {
    this.count++;
    const params = await pokeApi.params(String(generation))
    const req = await pokeApi.getAllPokemon(params)
    console.log('gen', this.count, 'ready')
    return req as unknown as ListPokemon[]
  }
  public async run() {
    try {
      const gen1 = await this.create(1);
      const gen2 = await this.create(2);
      const gen3 = await this.create(3);
      const gen4 = await this.create(4);
      const gen5 = await this.create(5);
      const gen6 = await this.create(6);
      const gen7 = await this.create(7);
      const gen8 = await this.create(8);
      const gen9 = await this.create(9);

      const data = [
        ...gen1.map(v => ({ ...v, generation: '1' })),
        ...gen2.map(v => ({ ...v, generation: '2' })),
        ...gen3.map(v => ({ ...v, generation: '3' })),
        ...gen4.map(v => ({ ...v, generation: '4' })),
        ...gen5.map(v => ({ ...v, generation: '5' })),
        ...gen6.map(v => ({ ...v, generation: '6' })),
        ...gen7.map(v => ({ ...v, generation: '7' })),
        ...gen8.map(v => ({ ...v, generation: '8' })),
        ...gen9.map(v => ({ ...v, generation: '9' })),
      ] as unknown as ListPokemon[];
      
      await ListPokemon.createMany(data);
    } catch (error) {
      console.log('error ->', error)
    }
  }
}
