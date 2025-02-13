import i18n from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enJSON from './dictionaries/en.json';
import ruJSON from './dictionaries/ru.json';

const languageDetector = new LngDetector();

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: [
        'querystring',
        'cookie',
        'localStorage',
        'navigator',
        'tldDetector',
        'htmlTag',
        'path',
        'subdomain'
      ]
    },
    ns: [],
    fallbackLng: 'ru',
    resources: {
      ru: ruJSON,
      en: enJSON
    },
    returnNull: false,
    react: { useSuspense: false }
  });
