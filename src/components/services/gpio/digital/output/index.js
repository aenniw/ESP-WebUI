// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import Button from "../../../../content/buttons/button";
import { Requests } from "../../../../tools/commons";
import GpioState from "../state";

export default class GpioButtonOut extends Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(props) {
    this.state = { state: props.state };
  }

  toggle = () => {
    const { pin } = this.props;
    const { state } = this.state;
    Requests.post("set-d-io-state", { pin: pin, state: !state }).then(
      ({ result }) => {
        if (result)
          this.setState(({ state }) => {
            return { state: !state };
          });
      }
    );
  };

  render({ pin, onRemove }, { state }) {
    return (
      <tr class={style.gpio_button}>
        <td>GPIO - {pin}</td>
        <GpioState state={state} />
        <td>
          <Button label="buttons.toggle" onClick={this.toggle} />
          <Button label="buttons.remove" onClick={() => onRemove(pin)} />
        </td>
      </tr>
    );
  }
}
