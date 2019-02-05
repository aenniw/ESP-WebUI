// noinspection ES6UnusedImports
import { h } from "preact";
import { Text } from "preact-i18n";
import style from "./style.less";

export default function Category({
  label,
  name = label && <Text id={label} />,
  children
}) {
  return (
    <fieldset class={style.category}>
      <legend>{name && name}</legend>
      <table>
        <tbody>{children}</tbody>
      </table>
    </fieldset>
  );
}
