// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";
import { Localizer, Text } from "preact-i18n";

export function Input({ id, label = "", value, onChange, type = "text" }) {
  return (
    <Localizer>
      <input
        id={id}
        type={type}
        placeholder={<Text id={label} />}
        onChange={onChange}
        value={value}
      />
    </Localizer>
  );
}

export function Password({ onChange, value = "" }) {
  return (
    <Input
      type="password"
      label="auth.password"
      onChange={onChange}
      value={value}
    />
  );
}

export function Submit({ label }) {
  return (
    <Localizer>
      <input
        class={style.input_submit}
        type="submit"
        value={<Text id={label} />}
      />
    </Localizer>
  );
}

export class File extends Component {
  setFileName = ({ target }) => {
    this.setState({ fileName: target.value.split("\\").last() });
  };

  render({ id, label = "" }, { fileName = <Text id="file.none" /> }) {
    return (
      <span class={style.input_file}>
        <label for={id}>
          <Text id={label} />
        </label>
        <input id={id} type="file" name="update" />
        <span>{fileName}</span>
      </span>
    );
  }
}
