// noinspection ES6UnusedImports
import { Component, h } from "preact";
import { AnimationTypes } from "../type";

export default function AnimationSpeedRange({ value, onChange }) {
  return (
    <input
      type="range"
      step="1"
      min={0}
      max={255}
      value={value}
      onChange={onChange}
    />
  );
}
