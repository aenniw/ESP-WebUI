// noinspection ES6UnusedImports
import { h } from "preact";
import style from "./style.less";

export default function MediaLabel() {
  return process.env.NODE_ENV !== "production" ?
    <span class={style.media_label} /> :
    null;
}