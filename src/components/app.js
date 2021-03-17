// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { Router } from "preact-router";
import style from "./style.less";
import "./tools/prototypes";

import Header from "./content/header";

export default class App extends Component {
  state = {
    logged: true,
    url: "/"
  };

  handleRoute = () => {
    this.setState(() => {
      return { url: window.location.pathname + window.location.hash };
    });
  };

  render({ }, { logged, url }) {
    return (
      <div class={style.document}>
        <Header url={url} />

        <Router onChange={this.handleRoute}>

        </Router>
      </div>
    );
  }
}
