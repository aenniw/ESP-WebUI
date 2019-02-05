// noinspection ES6UnusedImports
import { h } from "preact";
import style from "./style.less";

import { Text } from "preact-i18n";

export default () => {
  return (
    <footer class={style.footer}>
      <Text id="copyright" />
    </footer>
  );
};
