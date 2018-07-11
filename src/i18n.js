import i18n     from 'i18next';
import de       from './locales/translation-de.json';
import en       from './locales/translation-en.json';
import effEng   from './locales/effectsTranslation-en.json';
import effDeu   from './locales/effectsTranslation-de.json';

import LanguageDetector from 'i18next-browser-languagedetector';

const lngDetectorOptions = {
  // order and from where user language should be detected
  order: ['navigator', 'querystring', 'cookie', 'localStorage', 'htmlTag'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement
};

i18n
  .use(LanguageDetector)
  .init({
    resources: {
      //oc: needed for effects
      de: { translation: de, effectsTranslation: effDeu },
      en: { translation: en, effectsTranslation: effEng },
      //en: { effectsTranslation: en},
      //de: { effectsTranslation: de}
    },
    interpolation: {
      escapeValue: false
    },
    //oc: need new namespace for effects
    ns: ['translation', 'effectsTranslation'],
    //ns: ['translation'],
    defaultNs: 'translation',
    detection: lngDetectorOptions,
    fallbackLng: 'de'
  });

export default i18n;
