import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateMyDexValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    pokemon_id: schema.array().members(schema.string())
  })

  public messages: CustomMessages = {}
}
