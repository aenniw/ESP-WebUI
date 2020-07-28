// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import LedConfig from "./config";
import LedAmination from "./animation";
import Button from "../../content/buttons/button";
import { LightRequests, AdminRequests } from "../../tools/commons";

export default class LedStrip extends Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps() {
    LightRequests.getConfig().then(resp => this.setState(resp));
  }

  restart = () => {
    AdminRequests.restart();
  };

  applyChanges = () => {
    this.ledConfig.applyChanges();
  };

  render({}, { length, mode, type, ...state }) {
    return (
      <div class={style.led}>
        <LedConfig
          ref={ref => (this.ledConfig = ref)}
          mode={mode}
          length={length}
          type={type}
        />
        <Button label="buttons.reboot" onClick={this.restart} />
        <Button label="buttons.apply" onClick={this.applyChanges} />
        <LedAmination {...state} />
      </div>
    );
  }
}
