// noinspection ES6UnusedImports
import { h } from "preact";
import { Text } from "preact-i18n";
import style from "./style.less";

export default function Button({
  label,
  onClick,
  name,
  className = style.button
}) {
  if (!name && label) {
    name = <Text id={label} />;
  }

  return (
    <button onClick={onClick} class={className}>
      {name && name}
    </button>
  );
}
