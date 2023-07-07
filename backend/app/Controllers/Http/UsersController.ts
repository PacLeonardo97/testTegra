import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';
import factoryError from 'App/Validators/helper';

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.all()
      response.json(users)
    } catch (error) {
      response.status(500).send({
        error: 'Unexpected error while retrieving users'
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateUserValidator)
      const userExist = await User.findBy('email', payload.email)
      if(userExist) {
        return response.badRequest(factoryError('Email já cadastrado'))
      }
      const user = await User.create(payload)
      response.json(user)
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const user = await User.find(request.input('id'))
      response.json(user)
    } catch (error) {
      response.status(500).send({
        error: 'Unexpected error while retrieving user'
      })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const user = await User.find(request.param('id'))
      const payload = await request.validate(CreateUserValidator)
      
      if (!user) {
        return response.badRequest(factoryError('Usuário não encontrado'))
      }

      user.merge(payload)
      await user.save()
      response.json(user)
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const user = await User.find(request.param('id'))
      if (!user) {
        return response.badRequest(factoryError('Usuário não encontrado'))
      }
      await user.delete()
      response.json({
        message: 'User deleted'
      })
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
