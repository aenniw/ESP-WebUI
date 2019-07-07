// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";
import { Localizer, Text } from "preact-i18n";

export function Input({ label = "", type = "text", className, ...props }) {
  return (
    <Localizer>
      <input
        class={className}
        type={type}
        placeholder={<Text id={label} />}
        {...props}
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
        <input id={id} type="file" name="update" onChange={this.setFileName} />
        <span>{fileName}</span>
      </span>
    );
  }
}
