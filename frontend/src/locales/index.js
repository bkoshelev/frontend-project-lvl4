import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ruLocale from './ru';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru: ruLocale,
    },
  });

export default i18n;
