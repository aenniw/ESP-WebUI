// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { Router } from "preact-router";
import { Link } from "preact-router";
import { Text } from "preact-i18n";
import style from "./style.less";

import Header from "./content/header";
import Footer from "./content/footer";
import Login from "./content/login";
import DropdownButton from "./content/buttons/dropdown";
import Status from "./services/status";
import Settings from "./services/settings";
import Monitoring from "./services/monitoring";
import Gpio from "./services/gpio/digital";
import LedStrip from "./services/led-strip";
import Button from "./content/buttons/button";
import { AdminRequests } from "./tools/commons";

function Navigation({ href, label }) {
  return (
    <Link href={href}>
      <Text id={label} />
    </Link>
  );
}

export default class App extends Component {
  state = {
    logged: true
  };

  handleRoute = ({ url }) => {
    this.state.url = url;
  };

  render({}, { logged }) {
    if (!logged) return <Login />;

    return (
      <div class={style.document}>
        <Header label="ESP-UI">
          <Navigation href="/config" label="navigation.settings" />
          <DropdownButton label="navigation.services">
            <Navigation href="/gpio/digital" label="navigation.gpio-digital" />
            <Navigation href="/led-strip" label="navigation.led-strip" />
          </DropdownButton>
          <Navigation href="/monitoring" label="navigation.monitoring" />
          <Button
            label="buttons.logout"
            onClick={() => AdminRequests.logout()}
          />
        </Header>
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
