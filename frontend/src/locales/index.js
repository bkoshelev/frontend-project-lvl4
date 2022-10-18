import { createInstance } from 'i18next';
import ruLocale from './ru';

const i18n = createInstance();
i18n.init({
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ru: ruLocale,
  },
});

export default i18n;
