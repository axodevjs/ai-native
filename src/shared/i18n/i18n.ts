import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import kz from "../../locales/kz.json";
import en from "../../locales/en.json";
import ru from "../../locales/ru.json";

// Инициализация i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
    kz: {
      translation: kz,
    },
  },
  lng: "ru", // Язык по умолчанию
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
