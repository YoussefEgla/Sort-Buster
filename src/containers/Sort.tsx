import React from "react";
import * as ReactRedux from "react-redux";
import * as Slice from "../store/Slice";
import * as Material from "@material-ui/core";

//
// Icons
//
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ReplayIcon from "@material-ui/icons/Replay";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";

function ProgressSlider() {
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

function SpeedSlider() {
  const dispatch = ReactRedux.useDispatch();

  const currentSpeed = ReactRedux.useSelector(Slice.playSpeed);

  return (
    <Material.Slider
      min={5}
      max={500}
      step={5}
      value={currentSpeed}
      track="inverted"
      marks
      onChange={(e, v) => {
        dispatch(Slice.actions.changeSpeed(typeof v === "number" ? v : v[0]));
      }}
      valueLabelDisplay="auto"
    />
  );
}

export function Sort() {
  const classes = useStyles();
  const dispatch = ReactRedux.useDispatch();

  const playbackState = ReactRedux.useSelector(Slice.playback);

  return (
    <React.Fragment>
      <div className={classes.topContainer}>
        <SpeedSlider />
      </div>

      <Material.Divider />

      <div className={classes.bottomContainer}>
        <div className={classes.slider}>
          <Material.Typography>Progress</Material.Typography>
          <ProgressSlider />
        </div>
        <Material.ButtonGroup size="small" aria-label="Control Sorting">
          <Material.Button>
            <FastRewindIcon />
          </Material.Button>
          <Material.Button
            onClick={() =>
              dispatch(Slice.actions.step({ type: "STEP BACKWARD" }))
            }
          >
            <SkipPreviousIcon />
          </Material.Button>
          <Material.Button
            aria-label={playbackState === "PLAYING" ? "PAUSE" : "PLAY"}
            onClick={() => {
              if (playbackState === "PAUSED") {
                dispatch(Slice.actions.playAsync());
              } else if (playbackState === "FINISHED") {
                dispatch(Slice.actions.resetPlay());
                dispatch(Slice.actions.playAsync());
              } else {
                dispatch(Slice.actions.pause());
              }
            }}
          >
            {playbackState === "PAUSED" ? (
              <PlayArrowIcon />
            ) : playbackState === "PLAYING" ? (
              <PauseIcon />
            ) : (
              <ReplayIcon />
            )}
          </Material.Button>
          <Material.Button
            onClick={() =>
              dispatch(Slice.actions.step({ type: "STEP FORWARD" }))
            }
          >
            <SkipNextIcon />
          </Material.Button>
          <Material.Button>
            <FastForwardIcon />
          </Material.Button>
        </Material.ButtonGroup>
      </div>
    </React.Fragment>
  );
}

const useStyles = Material.makeStyles((theme: Material.Theme) => ({
  topContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "75%",
    margin: "0 auto 25px auto",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "75%",
    margin: "25px auto 0 auto",
  },
  slider: {
    width: "50%",
    margin: "auto",
  },
}));
