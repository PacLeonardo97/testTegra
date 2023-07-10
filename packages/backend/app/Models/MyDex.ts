import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import ListPokemon from 'App/Models/ListPokemon'

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
}
