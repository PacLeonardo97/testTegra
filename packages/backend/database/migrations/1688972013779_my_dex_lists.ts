import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import users from 'app/Models/User';

export default class extends BaseSchema {
  protected tableName = 'my_dex_lists'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.increments('pokemon_id').unsigned().references('id').inTable('list_pokemon').onDelete('CASCADE').unique()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
