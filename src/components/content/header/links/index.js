// noinspection ES6UnusedImports
import { Fragment, h } from "preact";
import { Text } from "preact-i18n";
import style from "./style.less";

import Espressif from "../../../resources/svg/espressif-logo.svg";
import Home from "../../../resources/svg/home-solid.svg";
import Settings from "../../../resources/svg/sliders-h-solid.svg";
import About from "../../../resources/svg/info-circle-solid.svg";
import Logout from "../../../resources/svg/sign-out-alt-solid.svg";
import Login from "../../../resources/svg/sign-in-alt-solid.svg";

function Logo() {
  return (
    <a href='https://github.com/aenniw/ESPRESSIF' tabindex="-1" aria-hidden='true'>
      <Espressif />
    </a>
  );
}

function Link({ tag: Tag = 'a', href, children, text, compact = true, textVisible = false, ...props }) {
  const selected = (window.location.pathname + (window.location.hash || '#')) === href;
  return (
    <Tag href={href} className={selected ? style.link_selected : style.link} {...props}>
      {children}
      {((selected && compact) || textVisible) && text && <p><Text id={text} /></p>}
    </Tag>
  );
}

function Links({ logged = false, ...props }) {
  return (
    <Fragment>
      <Link text='navigation.home' href='/#' {...props}>
        <Home />
      </Link>
      <Link text='navigation.settings' href='/#settings' {...props}>
        <Settings />
      </Link>
      <Link text='navigation.about' href='/#about' {...props}>
        <About />
      </Link>
      {
        logged ?
          <Link text='navigation.logout' href='/logout' compact={false} {...props}>
            <Logout />
          </Link> :
          <Link text='navigation.login' href='/login' compact={false} {...props}>
            <Login />
          </Link>
      }
    </Fragment>
  );
}

export { Logo, Link, Links };