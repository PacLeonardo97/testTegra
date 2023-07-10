import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [
      rules.email()
    ]),
    password: schema.string({}, [
      rules.minLength(8),
      rules.strongPassword()
    ]),
  })

  // public messages: CustomMessages = this.ctx.i18n.validatorMessages()
}
