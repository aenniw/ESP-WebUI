// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { Text } from "preact-i18n";
import style from "./style.less";

export default class DropdownButton extends Component {
  state = {
    pressed: false
  };

  toggle = () => {
    this.setState(({ pressed }) => {
      return { pressed: !pressed };
    });
  };

  render({ label, children }, { pressed }) {
    return (
      <span
        class={style.dropdown}
        onMouseEnter={() => this.setState({ pressed: true })}
        onMouseLeave={() => this.setState({ pressed: false })}
      >
        <button onClick={this.toggle}>
          <Text id={label} />
        </button>
        <div>{pressed && children}</div>
      </span>
    );
  }
}
