import Application from '@ioc:Adonis/Core/Application'
import type { I18nConfig } from '@ioc:Adonis/Addons/I18n'

const i18nConfig: I18nConfig = {
  translationsFormat: 'icu',
  defaultLocale: 'en',

  supportedLocales: ['en', 'pt-BR'],
  provideValidatorMessages: true,

  loaders: {
    fs: {
      enabled: true,
      location: Application.resourcesPath('lang'),
    },
  },
}

export default i18nConfig
