import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeSave} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import ListPokemon from 'App/Models/ListPokemon'
import { v4 as uuidv4 } from 'uuid';

export default class MyDexList extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => ListPokemon, {
    foreignKey: 'pokemon_id',
  })
  public listPokemon: BelongsTo<typeof ListPokemon>

  @column()
  user_id: string

  @column()
  pokemon_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static generateUUID(myDex: MyDexList) {
    myDex.id = uuidv4()
  }
}
