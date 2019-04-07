// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import Category from "../../../content/tables/category";
import Field from "../../../content/tables/field";
import { Input, Password, File, Submit } from "../../../content/inputs";
import { Requests } from "../../../tools/commons";
import { Text } from "preact-i18n";
import Button from "../../../content/buttons/button";

export default class Access extends Component {
  componentWillMount() {
    Requests.get("get-config-global").then(resp => {
      this.setState({ config: resp });
    });
  }

  applyChanges = () => {
    const { user, pass } = this.state;
    Requests.post("set-config-global", { "rest-acc": user, "rest-pass": pass });
  };

  setPassword = ({ target }) => {
    this.setState({ pass: target.value });
  };

  setUser = ({ target }) => {
    this.setState({ user: target.value });
  };

  setMode = ({ target }) => {
    this.setState({ mode: target.value });
  };

  render({}, { config = {}, mode = 0 }) {
    return (
      <Category label="settings.management">
        <Field label="auth.user">
          <Input
            label="auth.user"
            value={config["rest-acc"]}
            onChange={this.setUser}
          />
        </Field>
        <Field label="auth.password">
          <Password onChange={this.setPassword} />
        </Field>
        <Field label="ota.firmware">
          <form
            class={style.ota_form}
            method="POST"
            action={"/ota/update?mode=" + mode}
            enctype="multipart/form-data"
          >
            <File id="ota-binary" label="buttons.select" />
            <select onChange={this.setMode} value={mode}>
              <option value={0}>
                <Text id="ota.firmware" />
              </option>
              <option value={100}>
                <Text id="ota.spiffs" />
              </option>
            </select>
            <Submit label="ota.flash" />
          </form>
        </Field>
      </Category>
    );
  }
}
