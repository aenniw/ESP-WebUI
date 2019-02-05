// noinspection ES6UnusedImports
import { h } from "preact";
import { Text } from "preact-i18n";
import style from "./style.less";

export default function Separator({
  label,
  name = label && <Text id={label} />,
  collumns = 5
}) {
  return (
    <tr class={style.separator}>
      <td colspan={collumns}>
        <hr>{name && <p>{name}</p>}</hr>
      </td>
    </tr>
  );
}
