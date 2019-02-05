// noinspection ES6UnusedImports
import { h } from "preact";
import style from "./style.less";

export default function ProgressBar({ score, description = score + " %" }) {
  if (score === undefined) return null;
  return (
    <div class={style.progress}>
      <div
        style={{
          width: score + "%"
        }}
      />
      <span>{description}</span>
    </div>
  );
}
