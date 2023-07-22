import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';
import { DateTime } from 'luxon';

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
    foreignKey: 'userId'
  })
  public user: BelongsTo<typeof User>;

  @column.dateTime()
  public ex: DateTime;

  @column.dateTime()
  public expires_at: DateTime;
}
