import React from "react";
import * as ReactRedux from "react-redux";
import * as Slice from "../store/Slice";
import * as Material from "@material-ui/core";

export function StepsDisplay() {
  const currentStep = ReactRedux.useSelector(Slice.currentStep);
  const totalSteps = ReactRedux.useSelector(Slice.sortingSteps).length;

  return (
    <Material.Typography>
      Step {currentStep + 1} of {totalSteps}
    </Material.Typography>
  );
}
