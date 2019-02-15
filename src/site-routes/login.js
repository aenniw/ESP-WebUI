const locales = {};

function getLabel(label) {
  return getLocale(navigator.language)[label];
}

function getLocale(locale = "en") {
  locale = locale.split("-")[0];
  if (locale in locales) return locales[locale];
  return locales.en;
}

locales.cs = {
  user: "Uživatel",
  password: "Heslo",
  login: "Přihlášení"
};
locales.en = {
  user: "User",
  password: "Password",
  login: "Login"
};

document.getElementById("username").placeholder = getLabel("user");
document.getElementById("password").placeholder = getLabel("password");
document.getElementById("submit").value = getLabel("login");
