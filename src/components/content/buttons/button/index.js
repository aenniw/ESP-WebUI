// noinspection ES6UnusedImports
import { h } from "preact";
import { Text } from "preact-i18n";
import style from "./style.less";

export default function Button({
  className,
  label,
  name = <Text id={label} />,
  onClick
}) {
  return (
    <button onClick={onClick} class={className}>
      {name && name}
    </button>
  );
}
