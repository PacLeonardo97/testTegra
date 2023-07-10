import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'list_pokemon'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').index().notNullable();
      table.string('name').index().notNullable();
      table.string('generation').index().notNullable();
      table.specificType('types', 'text[]').notNullable();
      table.string('img').notNullable();
      table.string('url').notNullable();
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
