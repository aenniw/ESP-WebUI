// noinspection ES6UnusedImports
import { h } from "preact";
import { IntlProvider } from "preact-i18n";

import locale_en from "./en.json";
import locale_cs from "./cs.json";

const locales = {
  en: locale_en,
  cs: locale_cs
};

function getLocale(locale = "en") {
  locale = locale.split("-")[0];
  console.log("Localization", locale);
  if (locale in locales) return locales[locale];
  return locale_en;
}

export default function Localized({ children }) {
  return (
    <IntlProvider
      mark={process.env.NODE_ENV !== "production"}
      definition={getLocale(navigator.language)}
    >
      {children}
    </IntlProvider>
  );
}
