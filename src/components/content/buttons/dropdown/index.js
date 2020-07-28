// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import Button from "../button";

export default class DropdownButton extends Component {
  state = {
    pressed: false
  };

  toggle = () => {
    this.setState(({ pressed }) => {
      return { pressed: !pressed };
    });
  };

  release = () => {
    this.setState({ pressed: false });
  };

  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.release();
  };

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, true);
  }

  render({ className, label, children }, { pressed }) {
    return (
      <span
        class={pressed ? style.dropdown_active : style.dropdown}
        ref={node => (this.node = node)}
      >
        <Button class={className} onClick={this.toggle} label={label} />
        <div onClick={this.toggle}>{pressed && children}</div>
      </span>
    );
  }
}
