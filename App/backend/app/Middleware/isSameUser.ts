import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class IsSameUser {
    public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
        const user = ctx.params.userID

        await next()

        // throw new AuthenticationException(
        //     'Unauthorized access',
        //     'E_UNAUTHORIZED_ACCESS'
        // )
    }
}
