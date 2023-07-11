import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateMyDexValidator from 'App/Validators/CreateMyDexValidator';
import MyDexList from 'App/Models/MyDex';

export default class MyDexesController {
    public async index({ response, auth }: HttpContextContract) {
        try {
            const data = await auth.user?.related('myDexList').query();
            return {
                data
            }

        } catch (error) {
            response.badRequest(error.messages)
        }
    }

    public async store({ request, response, auth }: HttpContextContract) {
        try {
            const { pokemon_id } = await request.validate(CreateMyDexValidator)
            await MyDexList.createMany(pokemon_id.map(pokemon_id => ({ pokemon_id, user_id: auth.user?.id })))
            const data = await auth.user?.related('myDexList').query();
            response.json(data);
        } catch (error) {
            response.badRequest(error.messages)
        }
    }
}
