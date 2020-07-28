// noinspection ES6UnusedImports
import { Component, h } from "preact";
import style from "./style.less";

import Category from "../../../content/tables/category";
import Field from "../../../content/tables/field";
import { Input, File, Submit } from "../../../content/inputs";
import { Text } from "preact-i18n";
import Button from "../../../content/buttons/button";

function parseReleases(json, prerelease = true, fileType = "bin") {
  return json
    .filter(r => (r.prerelease = prerelease))
    .map(r =>
      r.assets
        .filter(a => a.name.endsWith(`.${  fileType}`))
        .map(a => {
          return {
            name: a.name,
            tag: r.tag_name,
            ffs: a.name.indexOf("ffs") >= 0,
            url: a.browser_download_url
          };
        })
    )
    .flat();
}

function Firmwares({ onChange, mode, releases = [], release, className }) {
  if (releases.length <= 0) {
    return null;
  }
  return (
    <select
      onChange={onChange}
      value={release}
      disabled={releases.length === 0}
      class={className}
    >
      {releases
        .filter(r => (r.ffs ? 100 : 0) === mode)
        .map(r => {
          return <Firmware release={r} />;
        })}
    </select>
  );
}

function Firmware({ release }) {
  return (
    <option value={release.url}>
      {release.tag} - {release.name}
    </option>
  );
}

export default class Ota extends Component {
  state = {
    uri: "https://api.github.com/repos/aenniw/ESP8266/releases",
    prerelease: true
  };

  setUri = ({ target }) => {
    this.setState({ uri: target.value });
  };

  setMode = ({ target }) => {
    this.setState({ mode: target.value, release: undefined });
  };

  setRelease = ({ target }) => {
    this.setState({ release: target.value });
  };

  setPrerelease = () => {
    this.setState(({ prerelease }) => {
      return { prerelease: !prerelease };
    });
  };

  checkUpdates = () => {
    const { uri, prerelease } = this.state;
    fetch(uri)
      .then(response => response.json())
      .then(response => {
        this.setState({ releases: parseReleases(response, prerelease) });
      })
      .catch(error => {
        console.warn(error);
      });
  };

  render(
    {},
    { mode = 0, uri, prerelease, releases = [], release = undefined }
  ) {
    return (
      <Category label="settings.ota">
        <Field label="ota.firmware">
          <form
            class={style.ota_form}
            method="POST"
            action={`/ota/update?mode=${  mode}`}
            enctype="multipart/form-data"
          >
            <File id="ota-binary" label="buttons.select" />
            <select onChange={this.setMode} value={mode}>
              <option value={0}>
                <Text id="ota.firmware" />
              </option>
              <option value={100}>
                <Text id="ota.spiffs" />
              </option>
            </select>
            <Submit label="ota.flash" />
          </form>
        </Field>
        <Field label="ota.updates">
          <Input
            label="ota.source"
            value={uri}
            onChange={this.setUri}
            className={style.ota_selection}
          />
          <Button
            onClick={this.checkUpdates}
            className={style.ota_buttons}
            name="&#x21bb;"
          />
          <div className={style.ota_prerelease}>
            <Text id="ota.prerelease" />
            <Input
              label="ota.source"
              type="checkbox"
              checked={prerelease}
              onChange={this.setPrerelease}
            />
          </div>
          <Firmwares
            className={style.ota_selection}
            onChange={this.setRelease}
            releases={releases}
            release={release}
            mode={mode}
          />
          {releases.length > 0 && (
            <a href={release} class={style.ota_buttons}>
              &#x2B73;
            </a>
          )}
        </Field>
      </Category>
    );
  }
}
