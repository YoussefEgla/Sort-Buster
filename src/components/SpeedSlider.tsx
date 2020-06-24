import React from "react";
import * as ReactRedux from "react-redux";
import * as Slice from "../store/Slice";
import * as Material from "@material-ui/core";

export function SpeedSlider() {
  const dispatch = ReactRedux.useDispatch();

  const currentSpeed = ReactRedux.useSelector(Slice.playSpeed);
  const playback = ReactRedux.useSelector(Slice.playback);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Material.Typography>Speed in ms</Material.Typography>
      <div
        style={{
          display: "flex",
          width: "65%",
          justifyContent: "space-between",
        }}
      >
        <Material.Typography>Fast</Material.Typography>
        <Material.Slider
          min={1}
          max={250}
          value={currentSpeed}
          track="inverted"
          defaultValue={1}
          onChange={(e, v) => {
            const speed = Math.round(typeof v === "number" ? v : v[0]);
            if (playback !== "PLAYING") {
              dispatch(Slice.actions.changeSpeed(speed));
            } else {
              dispatch(Slice.actions.changeSpeed(speed));
              dispatch(Slice.actions.pause());
              dispatch(Slice.actions.playAsync());
            }
          }}
          valueLabelDisplay="on"
          style={{ width: "50%" }}
        />
        <Material.Typography>Slow</Material.Typography>
      </div>
    </div>
  );
}
