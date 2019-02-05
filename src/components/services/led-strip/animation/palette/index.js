// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import Field from "../../../../content/tables/field";

function ColorButton({ onClick, label = "−", color }) {
  return (
    <li onClick={onClick} style={{ background: color }}>
      {label}
    </li>
  );
}

export default class ColorPalette extends Component {
  render({ colors = [], onAdd, onRemove }) {
    return (
      <Field label="led.palette">
        <ul class={style.palette}>
          {colors.map((c, i) => (
            <ColorButton color={c} onClick={() => onRemove(i)} />
          ))}
          <ColorButton
            color="black"
            label="+"
            onClick={() => this.colorPicker.click()}
          />
        </ul>
        <input
          type="color"
          onChange={({ target }) => onAdd(target.value)}
          style={{ display: "none" }}
          ref={ref => (this.colorPicker = ref)}
        />
      </Field>
    );
  }
}
