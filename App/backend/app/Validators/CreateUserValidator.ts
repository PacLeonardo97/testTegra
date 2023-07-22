import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class CreateUserValidator {
  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(8), rules.strongPassword()])
  });
}
