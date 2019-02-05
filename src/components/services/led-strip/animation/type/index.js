// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { Text } from "preact-i18n";

export const AnimationTypes = {
  Color: 0,
  Rainbow1: 1,
  Rainbow2: 2,
  Switch1: 3,
  Switch2: 4
};

const AnimationLabels = {
  Color: "color",
  Rainbow1: "rainbow-1",
  Rainbow2: "rainbow-2",
  Switch1: "switch-1",
  Switch2: "switch-2"
};

export default function AnimationTypePicker({ value, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      {Object.keys(AnimationLabels).map((k, i) => (
        <option value={i}>
          <Text id={"led.modes." + AnimationLabels[k]} />
        </option>
      ))}
    </select>
  );
}
