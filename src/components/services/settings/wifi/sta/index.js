// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { Text } from "preact-i18n";
import style from "./style.less";

import Category from "../../../../content/tables/category";
import Field from "../../../../content/tables/field";
import { Password } from "../../../../content/inputs";
import { Requests } from "../../../../tools/commons";
import Button from "../../../../content/buttons/button";

export default class WifiSta extends Component {
  componentWillMount() {
    Requests.get("get-config-wifi-sta").then(resp => {
      this.setState(resp);
    });
  }

  refreshNetworks = () => {
    Requests.get("get-networks").then(resp => {
      this.setState(resp);
    });
  };

  applyChanges = () => {
    const { networks, ip, status, ...state } = this.state;
    Requests.post("set-config-wifi-sta", state);
  };

  setPassword = ({ target }) => {
    this.setState({ pass: target.value });
  };

  setSSID = ({ target }) => {
    this.setState({ ssid: target.value });
  };

  render({}, { networks = [], ssid, pass, status, ip }) {
    return (
      <Category name="Wifi - STA">
        <Field label="settings.wifi.ap">
          <select class={style.networks} onChange={this.setSSID}>
            <option key={0} value={ssid}>
              {ssid}
            </option>
            {networks
              .filter(n => n !== ssid)
              .map((n, i) => (
                <option key={i + 1} value={n}>
                  {n}
                </option>
              ))}
          </select>
          <Button
            className={style.networks_refresh}
            onClick={this.refreshNetworks}
          />
        </Field>
        <Field label="auth.password">
          <Password onChange={this.setPassword} value={pass} />
        </Field>
        <Field label="status.label">
          {status === 1 ? (
            <Text id="settings.wifi.connected" />
          ) : (
            <Text id="settings.wifi.disconnected" />
          )}
        </Field>
        <Field label="settings.wifi.address">{ip}</Field>
      </Category>
    );
  }
}
