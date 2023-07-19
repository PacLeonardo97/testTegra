import {
  BaseModel,
  beforeSave,
  column,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuidv4 } from 'uuid';
import ListPokemon from './ListPokemon';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => ListPokemon, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'pokemon_id',
    pivotTable: 'my_dex_lists',
  })
  public myDexList: ManyToMany<typeof ListPokemon>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  
  @beforeSave()
  public static generateUUID(user: User) {
    user.id = uuidv4()
  }
}