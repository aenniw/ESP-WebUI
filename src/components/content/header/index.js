// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import { Navigation, NavigationMenu, NavigationDropDown } from "./navigation";

export default class Header extends Component {
  state = { pressed: false };

  toggle = () => {
    this.setState(({ pressed }) => {
      return {
        pressed: !pressed
      };
    });
  };

  release = () => {
    this.setState({ pressed: false });
  };

  navClassName = href => {
    if (this.props.url === href) return style.selected;
    return style.focus;
  };

  navInnerClassName = href => {
    if (this.props.url === href) return style.selected_mobile;
    return style.hidden;
  };

  render({ hrefs = ["/gpio/digital", "/led-strip"] }, { pressed }) {
    return (
      <header className={pressed ? style.header_expanded : style.header}>
        <Navigation
          onClick={this.release}
          className={this.navClassName}
          href="/"
          label="home"
        />
        <Navigation
          onClick={this.release}
          className={this.navClassName}
          href="/config"
        />
        <NavigationDropDown
          onClick={this.release}
          className={this.navClassName}
          label="navigation.services"
          hrefs={hrefs}
        />
        {hrefs.map(href => (
          <Navigation
            onClick={this.release}
            className={this.navInnerClassName}
            href={href}
          />
        ))}
        <Navigation
          onClick={this.release}
          className={this.navClassName}
          href="/monitoring"
        />
        <Navigation
          onClick={this.release}
          className={this.navClassName}
          href="/logout"
        />
        {!pressed && <NavigationMenu onClick={this.toggle} />}
      </header>
    );
  }
}
