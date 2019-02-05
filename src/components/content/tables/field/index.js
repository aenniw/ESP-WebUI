// noinspection ES6UnusedImports
import { h } from "preact";
import { Text } from "preact-i18n";

import style from "./style.less";

export default function Field({
  label,
  name = label && <Text id={label} />,
  children
}) {
  return (
    <tr class={style.field}>
      <td>{name && name}</td>
      <td>{children}</td>
    </tr>
  );
}
