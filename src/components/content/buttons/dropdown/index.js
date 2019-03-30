// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { Text } from "preact-i18n";
import style from "./style.less";

const MOUSE_DOWN = "mousedown";

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
    document.addEventListener(MOUSE_DOWN, this.handleClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener(MOUSE_DOWN, this.handleClick, true);
  }

  render({ className, label, children }, { pressed }) {
    return (
      <span
        class={pressed ? style.dropdown_active : style.dropdown}
        ref={node => (this.node = node)}
      >
        <button class={className} onClick={this.toggle}>
          <Text id={label} />
        </button>
        <div
          style={{ display: pressed ? "block" : "none" }}
          onClick={this.toggle}
        >
          {children}
        </div>
      </span>
    );
  }
}
