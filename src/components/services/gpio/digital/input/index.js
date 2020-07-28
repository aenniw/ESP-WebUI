// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import Button from "../../../../content/buttons/button";
import { Requests } from "../../../../tools/commons";
import GpioState from "../state";

export default class GpioButtonIn extends Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(props) {
    this.state = { state: props.state };
  }

  refresh = () => {
    const { pin } = this.props;
    Requests.get("get-d-io-state", { pin }).then(resp => {
      this.setState(resp);
    });
  };

  render({ pin, onRemove }, { state }) {
    return (
      <tr class={style.gpio_button}>
        <td>GPIO - {pin}</td>
        <GpioState state={state} />
        <td>
          <Button label="buttons.refresh" onClick={this.refresh} />
          <Button label="buttons.remove" onClick={() => onRemove(pin)} />
        </td>
      </tr>
    );
  }
}
