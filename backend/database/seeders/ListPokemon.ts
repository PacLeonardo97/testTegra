import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import axios from "axios";
import ListPokemon from 'App/Models/ListPokemon';

export default class extends BaseSeeder {
  count = 0;

  private async create(generation: number) {
    this.count++;
    const params = {
      1: { limit: 151 },
      2: { offset: 151, limit: 100 },
      3: { offset: 251, limit: 135 },
      4: { offset: 386, limit: 107 },
      5: { offset: 493, limit: 156 },
      6: { offset: 649, limit: 72 },
      7: { offset: 721, limit: 88 },
      8: { offset: 809, limit: 96 },
      9: { offset: 905, limit: 105 },
    }[generation] as any;
    const req = await axios.get(`https://pokeapi.co/api/v2/pokemon?${new URLSearchParams(params).toString()}`);
    console.log('gen', this.count, 'ready')
    return await Promise.all(req.data.results.map(async ({ name, url }) => {
      const id = `${url
        .replace("https://pokeapi.co/api/v2/pokemon/", "")
        .replace(/\D/g, "")}`;
      const { data } = await axios.get(url);

      return {
        name,
        id,
        url,
        types: data.types.map((v) => v.type.name),
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    }));
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
      ];

      await ListPokemon.createMany(data);
    } catch (error) {
      console.log('error ->', error)
    }
  }
}
