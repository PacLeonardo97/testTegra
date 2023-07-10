import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MyDexesController {
    public async index({ response, auth, i18n }: HttpContextContract) {
        try {
            const data = await auth.user?.related('myDexList').query();
            return {
                data
            }

        } catch (error) {
            console.log('error ->', error)
        }
        // if (auth.user?.id) {
        //     User.
        //     const data = await MyDexList
        //         .query()
        //         .select('pokemon_id', 'user_id')
        //         .where('user_id', auth.user?.id)
        //         .preload('listPokemon')

        //     return response.json({ data });
        // }
    }
}
