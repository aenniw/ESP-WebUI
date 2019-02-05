// noinspection ES6UnusedImports
import { h } from "preact";
import { Localizer, Text } from "preact-i18n";

export function Input({ label, value, onChange, type = "text" }) {
  return (
    <Localizer>
      <input
        type={type}
        placeholder={<Text id={label} />}
        onChange={onChange}
        value={value}
      />
    </Localizer>
  );
}

export function Password({ onChange, value = "" }) {
  return (
    <Input
      type="password"
      label="auth.password"
      onChange={onChange}
      value={value}
    />
  );
}
