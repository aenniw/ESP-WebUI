// noinspection ES6UnusedImports
import { h } from "preact";
import { Text } from "preact-i18n";

export default function GpioState({ state }) {
  return (
    <td style={{ background: !state ? "red" : "green" }}>
      {!state ? <Text id="gpio.low" /> : <Text id="gpio.high" />}
    </td>
  );
}
