// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { Text } from "preact-i18n";

import Category from "../../../../content/tables/category";
import Field from "../../../../content/tables/field";
import { Password } from "../../../../content/inputs";
import { Requests } from "../../../../tools/commons";

export default class WifiAp extends Component {
  componentWillMount() {
    Requests.get("get-config-wifi-ap").then(resp => {
      this.setState(resp);
    });
  }

  applyChanges = () => {
    const { ip, ...state } = this.state;
    Requests.post("set-config-wifi-ap", state);
  };

  setPassword = ({ target }) => {
    this.setState({ pass: target.value });
  };

  setSSID = ({ target }) => {
    this.setState({ ssid: target.value });
  };

  setChannel = ({ target }) => {
    this.setState({ channel: target.value });
  };

  setHidden = ({ target }) => {
    this.setState({ hidden: target.value === 1 });
  };

  render({}, { ssid, channel, pass, hidden, ip }) {
    return (
      <Category name="Wifi - AP">
        <Field name="SSID">
          <input
            type="text"
            placeholder="SSID"
            value={ssid}
            onChange={this.setSSID}
          />
        </Field>
        <Field label="auth.password">
          <Password onChange={this.setPassword} value={pass} />
        </Field>
        <Field label="settings.wifi.channel">
          <input
            type="number"
            min="1"
            max="14"
            value={channel}
            onChange={this.setChannel}
          />
        </Field>
        <Field label="settings.wifi.hidden">
          <select value={hidden === 1} onChange={this.setHidden}>
            <option value="0">
              <Text id="settings.wifi.visible" />
            </option>
            <option value="1">
              <Text id="settings.wifi.hidden" />
            </option>
          </select>
        </Field>
        <Field label="settings.wifi.address">{ip}</Field>
      </Category>
    );
  }
}
