// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import Button from "../../content/buttons/button";
import { AdminRequests } from "../../tools/commons";
import Wifi from "./wifi";
import Access from "./access";

export default class Settings extends Component {
  restart = () => {
    AdminRequests.restart();
  };

  reset = () => {
    AdminRequests.reset();
  };

  applyChanges = () => {
    this.access.applyChanges();
    this.wifi.applyChanges();
  };

  render() {
    return (
      <div class={style.settings}>
        <Access ref={ref => (this.access = ref)} />
        <Wifi ref={ref => (this.wifi = ref)} />
        <div>
          <Button label="buttons.reboot" onClick={this.restart} />
          <Button label="buttons.reset" onClick={this.reset} />
          <Button label="buttons.apply" onClick={this.applyChanges} />
        </div>
      </div>
    );
  }
}
