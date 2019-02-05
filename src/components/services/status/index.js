// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import Category from "../../content/tables/category";
import Field from "../../content/tables/field";
import ProgressBar from "../../content/tables/progress-bar";
import { Requests, Time, Conv } from "../../tools/commons";

function UnitProgressBar({
  current = 0,
  total = 1,
  unit = "kB",
  score = Math.round((current / total) * 100)
}) {
  return (
    <ProgressBar
      score={score}
      description={score + "% " + current + unit + " / " + total + unit}
    />
  );
}

export default class Status extends Component {
  state = {};

  componentWillMount() {
    Requests.get("get-cpu-info").then(resp => {
      this.setState({ cpu: resp });
    });
    Requests.get("get-system-info").then(resp => {
      this.setState({ system: resp });
    });
    Requests.get("get-mem-info").then(resp => {
      this.setState({ memory: resp });
    });
  }

  render({}, { system = {}, memory = {}, cpu = {} }) {
    return (
      <div class={style.status}>
        <Category label="status.system">
          <Field label="status.model">{system["model"]}</Field>
          <Field label="status.version">{system["firmware"]}</Field>
          <Field label="status.chip-id">
            {Conv.d2h(system["chip-id"], "0x")}
          </Field>
          <Field label="status.up-time">{Time.period(system["up-time"])}</Field>
        </Category>
        <Category label="status.memory">
          <Field label="status.sketch">
            <UnitProgressBar
              current={memory["sketch-mem-free"] / 1000}
              total={memory["sketch-mem-total"] / 1000}
            />
          </Field>
          <Field label="status.free">
            <UnitProgressBar
              current={memory["heap-free"] / 1000}
              total={memory["heap-total"] / 1000}
            />
          </Field>
        </Category>
        <Category label="status.cpu">
          <Field label="status.cpu-clock">
            <UnitProgressBar
              current={cpu["cpu-freq-cur"]}
              total={cpu["cpu-freq-max"]}
              unit="Mhz"
            />
          </Field>
        </Category>
      </div>
    );
  }
}
