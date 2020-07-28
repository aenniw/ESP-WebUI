// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { Router } from "preact-router";
import style from "./style.less";
import "./tools/prototypes";

import Header from "./content/header";
import Footer from "./content/footer";
import Login from "./content/login";
import Status from "./services/status";
import Settings from "./services/settings";
import Monitoring from "./services/monitoring";
import Gpio from "./services/gpio/digital";
import LedStrip from "./services/led-strip";

export default class App extends Component {
  state = {
    logged: true,
    url: "/"
  };

  handleRoute = ({ url }) => {
    this.setState(() => {
      return { url };
    });
  };

  render({}, { logged, url }) {
    if (!logged) return <Login />;

    return (
      <div class={style.document}>
        <Header url={url} />
        <Router onChange={this.handleRoute}>
          <Status path="/" />
          <Settings path="/config" />
          <Gpio path="/gpio/digital" />
          <LedStrip path="/led-strip" />
          <Monitoring path="/monitoring" />
        </Router>
        <Footer />
      </div>
    );
  }
}
