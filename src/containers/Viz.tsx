import React from "react";
import * as ReactRedux from "react-redux";
import * as d3Scale from "d3-scale";
import * as Components from "../components";
import * as GeneralSlice from "../store/GeneralSlice";
import * as SortingSlice from "../store/SortingSlice";

export function Viz() {
  const dataSet = ReactRedux.useSelector(GeneralSlice.dataSet);
  const sortingSteps = ReactRedux.useSelector(SortingSlice.sortingSteps);
  const currentStep = ReactRedux.useSelector(SortingSlice.currentStep);

  const data =
    sortingSteps && sortingSteps[0] === dataSet
      ? sortingSteps[currentStep]
      : dataSet;

  const BarWidth = 24;
  const width = data ? data.length * (BarWidth + 1) : 500;

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
    />
  ));

  return (
    <svg width={width} height="200px" style={{ margin: "auto" }}>
      {bars}
    </svg>
  );
}
