// noinspection ES6UnusedImports
import { Component, h } from "preact";

import Category from "../../../content/tables/category";
import Field from "../../../content/tables/field";
import { LightRequests, Conv } from "../../../tools/commons";
import AnimationTypePicker, { AnimationTypes } from "./type";
import AnimationSpeedRange from "./speed";
import ColorPalette from "./palette";

export default class LedAmination extends Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(props) {
    this.state = {
      speed: props.speed,
      brightness: props.brightness,
      color: Conv.d2h(props.color),
      colors: props.colors,
      type: props["animation-type"]
    };
    LightRequests.getAnimationColors()
      .then(resp => resp.colors.map(c => Conv.d2h(c)))
      .then(colors => this.setState({ colors: colors }));
  }

  setAnimationType = ({ target, value = Number(target.value) }) => {
    LightRequests.setAnimationMode(value).then(resp => {
      if (resp.result) this.setState({ type: value });
    });
  };

  setBrightness = ({ target, value = Number(target.value) }) => {
    LightRequests.setBrightness(value).then(resp => {
      if (resp.result) this.setState({ brightness: value });
    });
  };

  setSpeed = ({ target, value = Number(target.value) }) => {
    LightRequests.setSpeed(value).then(resp => {
      if (resp.result) this.setState({ speed: value });
    });
  };

  setColor = ({ target, value = target.value }) => {
    LightRequests.setColor(Conv.h2d(value)).then(resp => {
      if (resp.result) this.setState({ color: value });
    });
  };

  addAnimationColor = (value, index) => {
    const { colors = [] } = this.state;

    if (value !== undefined) {
      colors.push(value);
    } else if (index !== undefined) {
      colors.splice(index, 1);
    } else {
      return;
    }

    console.log(colors, value, index);
    LightRequests.setAnimationColors(colors.map(color => Conv.h2d(color))).then(
      resp => {
        if (resp.result) this.setState({ colors: colors });
      }
    );
  };
  remAnimationColor = value => this.addAnimationColor(undefined, value);

  render({}, { speed, brightness, color, colors, type }) {
    return (
      <Category label="navigation.config">
        <Field label="led.anim">
          <AnimationTypePicker value={type} onChange={this.setAnimationType} />
        </Field>
        <Field label="led.brigh">
          <input
            type="range"
            step="1"
            min="0"
            max="100"
            value={brightness}
            onChange={this.setBrightness}
          />
        </Field>
        {type === AnimationTypes.Color && (
          <Field label="led.color">
            <input type="color" value={color} onChange={this.setColor} />
          </Field>
        )}
        {type !== AnimationTypes.Color && (
          <Field label="led.speed">
            <AnimationSpeedRange value={speed} onChange={this.setSpeed} />
          </Field>
        )}
        {(type === AnimationTypes.Switch1 ||
          type === AnimationTypes.Switch2) && (
          <ColorPalette
            colors={colors}
            onAdd={this.addAnimationColor}
            onRemove={this.remAnimationColor}
          />
        )}
      </Category>
    );
  }
}
