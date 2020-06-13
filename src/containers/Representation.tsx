import React from "react";
import * as ReactRedux from "react-redux";
import * as d3Scale from "d3-scale";
import { currentSet, AppState } from "../store/AppReducer";
import * as Components from "../components";

export function Representation() {
  const data = ReactRedux.useSelector(currentSet);

  const BarWidth = 24;
  const width = data.length * (BarWidth + 1);

  const linearScale = d3Scale
    .scaleLinear()
    .domain([
      Math.min(...data.map((v) => v.value)) - 1,
      Math.max(...data.map((v) => v.value)),
    ])
    .range([0, 100]);

  const bars = data.map((v, i) => (
    <Components.Bar
      height={linearScale(v.value)}
      x={i * 25}
      value={v.value}
      key={v.id}
      active={v.active}
      done={v.done}
    />
  ));

  return (
    <svg width={width} height="200px" style={{ margin: "auto" }}>
      {bars}
    </svg>
  );
}
