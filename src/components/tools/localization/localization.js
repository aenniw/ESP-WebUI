// noinspection ES6UnusedImports
import { h } from "preact";
import { IntlProvider } from "preact-i18n";

import locale_en from "./en.json";
import locale_cz from "./cs.json";

function getLocale(locale = "en") {
  locale = locale.split("-")[0];
  console.log("Localization", locale);
  if (locale === "cs") return locale_cz;
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
