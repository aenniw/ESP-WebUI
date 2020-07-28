// noinspection ES6UnusedImports
import { Component, h } from "preact";

import Category from "../../../content/tables/category";
import Field from "../../../content/tables/field";
import { LightRequests } from "../../../tools/commons";

export default class LedConfig extends Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(props) {
    this.state = {
      mode: props.mode,
      type: props.type,
      length: props.length
    };
  }

  applyChanges = () => {
    LightRequests.setConfig(this.state);
  };

  setType = ({ target }) => {
    this.setState({ type: Number(target.value) });
  };

  setMode = ({ target }) => {
    this.setState({ mode: Number(target.value) });
  };

  setLength = ({ target }) => {
    this.setState({ length: Number(target.value) });
  };

  render({}, { length, mode, type }) {
    return (
      <Category label="led.label">
        <Field label="led.type">
          <select onChange={this.setType} value={type}>
            <option value="0">Grb</option>
            <option value="1">Grbw</option>
          </select>
        </Field>
        <Field label="led.mode">
          <select onChange={this.setMode} value={mode}>
            <option value="0">Dma800Kbps</option>
            <option value="2">Uart0800kps</option>
            <option value="1">Uart1800kps</option>
          </select>
        </Field>
        <Field label="led.pinout">
          {mode === 0 && "RX/GPIO3"}
          {mode === 1 && "D4/GPIO2"}
          {mode === 2 && "TX/GPIO1"}
        </Field>
        <Field label="led.length">
          <input
            type="number"
            value={length}
            min="1"
            max="65535"
            onChange={this.setLength}
          />
        </Field>
      </Category>
    );
  }
}
