// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { Text } from "preact-i18n";
import style from "./style.less";

import Category from "../../../content/tables/category";
import Separator from "../../../content/tables/separator";
import Button from "../../../content/buttons/button";
import GpioButtonIn from "./input";
import GpioButtonOut from "./output";
import { Requests } from "../../../tools/commons";

export default class DigitalGpio extends Component {
  state = {
    type: 1
  };

  componentWillMount() {
    Requests.get("devices-get-available-pins").then(({ pins = [] }) => {
      this.setState({ pins: pins, pin: pins[0] });
    });
    Requests.get("devices-get-d-io").then(resp => {
      this.setState(resp);
    });
  }

  setPin = ({ target }) => {
    this.setState({ pin: Number(target.value) });
  };

  setType = ({ target }) => {
    this.setState({ type: Number(target.value) });
  };

  addGPIO = () => {
    const { pin, type } = this.state;
    if (pin !== undefined)
      Requests.post("devices-add", { pin: pin, type: type }).then(
        ({ result }) => {
          if (result)
            this.setState(({ pins = [], devices = [] }) => {
              devices.push({ id: pin, state: false, type: type });
              pins.splice(pins.indexOf(pin), 1);

              return {
                pins: pins,
                devices: devices,
                pin: pins.length > 0 ? pins[0] : undefined
              };
            });
        }
      );
  };

  removeGPIO = id => {
    if (id !== undefined)
      Requests.post("devices-remove", { pin: id }).then(({ result }) => {
        if (result)
          this.setState(({ pins = [], devices = [] }) => {
            devices = devices.filter(d => d.id !== id);
            pins.push(id);

            return {
              pins: pins,
              devices: devices,
              pin: pins.length > 0 ? pins[0] : undefined
            };
          });
      });
  };

  render({}, { pin, type, pins = [], devices = [] }) {
    const outputDevices = devices
      .filter(d => d.type !== 0)
      .sort((a, b) => a.id - b.id);
    const inputDevices = devices
      .filter(d => d.type === 0)
      .sort((a, b) => a.id - b.id);

    return (
      <div>
        <Category label="gpio.label">
          <tr class={style.category}>
            <td>
              <select onChange={this.setPin} value={pin}>
                {pins
                  .filter(
                    p =>
                      inputDevices.indexOf(p) < 0 &&
                      outputDevices.indexOf(p) < 0
                  )
                  .sort()
                  .map((p, i) => (
                    <option key={i} value={p}>
                      {"Pin - " + p}
                    </option>
                  ))}
              </select>
            </td>
            <td>
              <select onChange={this.setType} value={type}>
                <option value="1">
                  <Text id="gpio.output" />
                </option>
                <option value="0">
                  <Text id="gpio.input" />
                </option>
              </select>
            </td>
            <td>
              <Button label="buttons.add" onClick={this.addGPIO} />
            </td>
          </tr>
          {outputDevices.length > 0 && <Separator label="gpio.output" />}
          {outputDevices.map(({ state, id }) => (
            <GpioButtonOut state={state} pin={id} onRemove={this.removeGPIO} />
          ))}
          {inputDevices.length > 0 && <Separator label="gpio.input" />}
          {inputDevices.map(({ state, id }) => (
            <GpioButtonIn state={state} pin={id} onRemove={this.removeGPIO} />
          ))}
        </Category>
      </div>
    );
  }
}
