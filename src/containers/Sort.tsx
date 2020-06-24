import React from "react";
import * as ReactRedux from "react-redux";
import * as Slice from "../store/Slice";
import * as Material from "@material-ui/core";
import * as Components from "../components";

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

export function Sort() {
  const classes = useStyles();
  const dispatch = ReactRedux.useDispatch();

  const playbackState = ReactRedux.useSelector(Slice.playback);
  const totalSteps = ReactRedux.useSelector(Slice.sortingSteps).length - 1;

  return (
    <React.Fragment>
      <div className={classes.topContainer}>
        <Components.SpeedSlider />
      </div>

      <Material.Divider />

      <div className={classes.bottomContainer}>
        <div className={classes.slider}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Material.Typography>Progress</Material.Typography>
            <Components.StepsDisplay />
          </div>

          <Components.ProgressSlider />
        </div>
        <Material.ButtonGroup size="small" aria-label="Control Sorting">
          <Material.Button
            onClick={() => {
              dispatch(Slice.actions.step({ type: "STEP TO", index: 0 }));
            }}
          >
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
            <FastForwardIcon
              onClick={() => {
                dispatch(
                  Slice.actions.step({ type: "STEP TO", index: totalSteps })
                );
              }}
            />
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
