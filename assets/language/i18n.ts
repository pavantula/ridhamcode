import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import en from './locale/en.json';
import no from './locale/no.json';

// the translations
const resources = {
  en: {
    translation: en
  },
  no: {
    translation: no
  }
};

i18n
  .use(initReactI18next) 
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: "en",
    fallbackLng: "en",    
    interpolation: {
      escapeValue: false 
    },
    react: {
      useSuspense:false,
   }
  });

  export default i18n;