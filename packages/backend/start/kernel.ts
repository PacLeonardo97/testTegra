import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
    () => import('@ioc:Adonis/Core/BodyParser'),
    () => import('App/Middleware/DetectUserLocale'),
    // () => import('App/Middleware/isSameUser'),
])

Server.middleware.registerNamed({
    auth: () => import('App/Middleware/Auth'),
})
