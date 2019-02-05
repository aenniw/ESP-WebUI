// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { Requests } from "../../tools/commons";
import style from "./style.less";

import Button from "../buttons/button";
import { Input, Password } from "../inputs";

export default class Login extends Component {
  state = {};

  setUser = ({ target }) => {
    this.setState({ user: target.value });
  };

  setPasswd = ({ target }) => {
    this.setState({ passwd: target.value });
  };

  login = () => {
    const { user, passwd } = this.state;
    Requests.get("login", {
      credentials: "include",
      headers: {
        Authorization: "Basic " + btoa(user + ":" + passwd)
      }
    }).then(() => location.reload());
  };

  render() {
    return (
      <div class={style.login}>
        <form>
          <Input label="auth.user" onChange={this.setUser} />
          <Password onChange={this.setPasswd} />
          <Button label="buttons.login" onClick={this.login} />
        </form>
      </div>
    );
  }
}
