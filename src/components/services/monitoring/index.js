// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import Category from "../../content/tables/category";
import Button from "../../content/buttons/button";

export default class Monitoring extends Component {
  state = {
    messages: []
  };
  ws = undefined;

  connect = () => {
    this.disconnect();
    this.ws = new WebSocket(`ws://${  location.host  }:8181`);
    this.ws.onmessage = ({ data }) => {
      const message = `[${  new Date().toLocaleTimeString()  }]> ${  data}`;
      this.setState(({ messages = [] }) => {
        console.log(message);
        messages.push(message);
        return { messages };
      });
    };
  };

  disconnect = () => {
    if (this.ws !== undefined) {
      this.ws.close();
    }
  };

  clear = () => {
    this.setState({ messages: [] });
  };

  componentWillUnmount() {
    this.disconnect();
  }

  render({}, { messages = [] }) {
    return (
      <div class={style.monitoring}>
        <Category label="monitoring.logs">
          <textarea
            disabled
            value={messages.reduce((a, b) => `${a  }\n${  b}`, "")}
          />
          <Button label="buttons.connect" onClick={this.connect} />
          <Button label="buttons.clear" onClick={this.clear} />
        </Category>
      </div>
    );
  }
}
