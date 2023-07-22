import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class ListPokemon extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
    name: string;

  @column()
    types: string[];

  @column()
    img: string;

  @column()
    url: string;

  @column()
    generation: string;
}
