import React from "react";
import * as ReactRedux from "react-redux";
import * as Slice from "../store/Slice";
import * as Material from "@material-ui/core";

//
// Icons
//
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

function Slider() {
  const dispatch = ReactRedux.useDispatch();

  const sortingSteps = ReactRedux.useSelector(Slice.sortingSteps);
  const currentStep = ReactRedux.useSelector(Slice.currentStep);

  return (
    <Material.Slider
      value={currentStep}
      min={sortingSteps.length === 1 ? 1 : 0}
      max={sortingSteps.length - 1}
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
        <Material.Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(Slice.actions.sort())}
        >
          Sort
        </Material.Button>
      </div>

      <Material.Divider />

      <div className={classes.bottomContainer}>
        <div className={classes.slider}>
          <Material.Typography>Progress</Material.Typography>
          <Slider />
        </div>
        <Material.ButtonGroup size="small" aria-label="Control Sorting">
          <Material.Button onClick={() => dispatch(Slice.actions.prevStep())}>
            Prev Step
          </Material.Button>
          <Material.Button
            aria-label={playbackState === "PLAYING" ? "PAUSE" : "PLAY"}
            onClick={() => {
              if (playbackState === "PAUSED") {
                dispatch(Slice.actions.playAsync());
              } else {
                dispatch(Slice.actions.pause());
              }
            }}
          >
            {playbackState === "PAUSED" ? <PlayArrowIcon /> : <PauseIcon />}
          </Material.Button>
          <Material.Button onClick={() => dispatch(Slice.actions.nextStep())}>
            Next Step
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
    width: "100%",
    margin: "0 auto 25px auto",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    margin: "25px auto 0 auto",
  },
  slider: {
    width: "50%",
    margin: "auto",
  },
}));
