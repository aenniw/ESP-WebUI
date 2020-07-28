// noinspection ES6UnusedImports
import { h } from "preact";
import style from "./style.less";

import DropdownButton from "../../buttons/dropdown";
import { Link } from "preact-router";
import { Text } from "preact-i18n";

function NavigationMenu({ onClick }) {
  return (
    <div className={style.menu} onClick={onClick}>
      <div />
      <div />
      <div />
    </div>
  );
}

function NavigationDropDown({ label, className, onClick, hrefs = [] }) {
  return (
    <DropdownButton label={label}>
      {hrefs.map(href => (
        <Navigation onClick={onClick} className={className} href={href} />
      ))}
    </DropdownButton>
  );
}

function Navigation({
  href,
  onClick,
  className,
  label = href.replaceAll("/", "-").substr(1)
}) {
  return (
    <Link href={href} onClick={onClick} className={className(href)}>
      <Text id={"navigation." + label} />
    </Link>
  );
}

export { Navigation, NavigationMenu, NavigationDropDown };
