// noinspection ES6UnusedImports
import { h } from "preact";
import style from "./style.less";

import { Text } from "preact-i18n";

export default function GpioState({ state }) {
  return (
    <td
      style={{ background: !state ? "red" : "green" }}
      class={style.gpio_state}
    >
      {!state ? <Text id="gpio.low" /> : <Text id="gpio.high" />}
    </td>
  );
}
