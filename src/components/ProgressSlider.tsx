import React from "react";
import * as ReactRedux from "react-redux";
import * as Slice from "../store/Slice";
import * as Material from "@material-ui/core";

export function ProgressSlider() {
  const dispatch = ReactRedux.useDispatch();

  const sortingSteps = ReactRedux.useSelector(Slice.sortingSteps);
  const currentStep = ReactRedux.useSelector(Slice.currentStep);

  return (
    <Material.Slider
      value={currentStep}
      min={sortingSteps.length === 1 ? 1 : 0}
      max={sortingSteps.length - 1}
      onChange={(e, v) => {
        dispatch(
          Slice.actions.step({
            type: "STEP TO",
            index: typeof v === "number" ? v : v[0],
          })
        );
      }}
    />
  );
}
