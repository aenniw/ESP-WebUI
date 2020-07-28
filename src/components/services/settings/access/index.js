// noinspection ES6UnusedImports
import { Component, h } from "preact";

import Category from "../../../content/tables/category";
import Field from "../../../content/tables/field";
import { Input, Password } from "../../../content/inputs";
import { Requests } from "../../../tools/commons";

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

  render({}, { config = {} }) {
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
      </Category>
    );
  }
}
