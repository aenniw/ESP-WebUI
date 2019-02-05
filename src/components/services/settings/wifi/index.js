// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import Category from "../../../content/tables/category";
import Field from "../../../content/tables/field";
import { Input } from "../../../content/inputs";
import { Requests } from "../../../tools/commons";
import WifiAp from "./ap";
import WifiSta from "./sta";

export default class Wifi extends Component {
  componentWillMount() {
    Requests.get("get-config-wifi").then(resp => {
      this.setState(resp);
    });
  }

  applyChanges = () => {
    const { mac, ...state } = this.state;
    Requests.post("set-config-wifi", state);
    if (state.mode !== 2) this.sta.applyChanges();
    if (state.mode !== 1) this.ap.applyChanges();
  };

  setMode = ({ target }) => {
    this.setState({ mode: Number(target.value) });
  };

  setHostname = ({ target }) => {
    this.setState({ hostname: target.value });
  };

  render({}, { mode = 1, mac, hostname }) {
    return (
      <div>
        <Category name="Wifi" class={style.wifi}>
          <Field label="settings.wifi.mode">
            <select onChange={this.setMode} value={mode}>
              <option value="1">STA</option>
              <option value="2">AP</option>
              <option value="3">AP+STA</option>
            </select>
          </Field>
          <Field label="settings.wifi.hostname">
            <Input
              label="settings.wifi.hostname"
              value={hostname}
              onChange={this.setHostname}
            />
          </Field>
          <Field label="settings.wifi.mac">{mac}</Field>
        </Category>
        {mode !== 2 && <WifiSta ref={ref => (this.sta = ref)} />}
        {mode !== 1 && <WifiAp ref={ref => (this.ap = ref)} />}
      </div>
    );
  }
}
