import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';

export default class CreateMyDexValidator {
  public schema = schema.create({
    pokemon_id: schema.array().members(schema.string())
  });

  public messages: CustomMessages = {};
}
