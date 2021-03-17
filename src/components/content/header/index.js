// noinspection ES6UnusedImports
import { Fragment, Component, h } from "preact";
import { Logo, Link, Links } from "./links";
import MediaLabel from "./media-labels";
import style from "./style.less";

import Select from "../../resources/svg/bars-solid.svg";

function HeaderBar({ tag: Tag = 'header', className, children }) {
  return (
    <Tag className={className}>
      <Logo />

      <div className={style.links}>
        {children}
      </div>
    </Tag>
  );
}

function HeaderDesktop(props) {
  return (
    <HeaderBar {...props} className={style.header}>
      <Links />
    </HeaderBar>
  );
}

class HeaderMobile extends Component {
  state = {
    expanded: false
  }

  toogle = () => {
    this.setState(({ expanded }) => {
      return { expanded: !expanded }
    });
  }

  render({ }, { expanded }) {
    return (
      <header className={style.header_mobile}>
        <HeaderBar tag='div'>
          <Link tag='button' onClick={this.toogle}>
            <Select />
          </Link>
        </HeaderBar>

        {
          expanded &&
          <div className={style.links_mobile}>
            <Links textVisible={true} onClick={this.toogle} />
          </div>
        }
      </header >
    );
  }
}

export default function Header(props) {
  return (
    <Fragment>
      <MediaLabel />

      <HeaderDesktop {...props} />
      <HeaderMobile {...props} />
    </Fragment>
  );
}
