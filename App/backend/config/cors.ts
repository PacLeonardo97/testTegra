import type { CorsConfig } from '@ioc:Adonis/Core/Cors';

const corsConfig: CorsConfig = {
  origin: '*',
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [
    'cache-control',
    'content-language',
    'content-type',
    'expires',
    'last-modified',
    'pragma'
  ],
  credentials: true,
  maxAge: 90,

  enabled: request => request.url().startsWith('/api')
};

export default corsConfig;
