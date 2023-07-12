import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Hash from '@ioc:Adonis/Core/Hash';
import User from 'App/Models/User';

export default class AuthController {
    public async login({ response, request, auth }: HttpContextContract) {
        const email = request.input('email');
        const password = request.input('password');
        const user = await User.findBy('email', email);
        try {
            if (!user || !(await Hash.verify(user.password, password))) {
                throw new Error('Invalid credentials')
            }
            return await auth.use('api').generate(user, {
                expiresIn: '30 mins'
            })
        } catch (e) {
            return response.unauthorized('Invalid credentials');
        }
    }
    public async logout({ auth }: HttpContextContract) {
        await auth.use('api').revoke()
        return {
            revoked: true
        }
    }
}
