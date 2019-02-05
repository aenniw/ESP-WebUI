// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { Link } from "preact-router";
import style from "./style.less";

export default class Header extends Component {
  render({ children, label }, {}) {
    return (
      <header class={style.header}>
        <h1>
          <Link href="/">{label}</Link>
        </h1>
        <nav>{children}</nav>
      </header>
    );
  }
}
