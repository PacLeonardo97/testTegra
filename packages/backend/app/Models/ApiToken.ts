import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';

export default class ApiToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ columnName: 'user_id' })
  userId: string;

  @column()
  name: string;

  @column()
  type: string;

  @column()
  token: string;

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
