import React from "react";
import * as ReactRedux from "react-redux";
import * as Slice from "../store/Slice";
import * as Material from "@material-ui/core";

function Slider() {
  const dispatch = ReactRedux.useDispatch();

  const sortingSteps = ReactRedux.useSelector(Slice.sortingSteps);
  const currentStep = ReactRedux.useSelector(Slice.currentStep);

  return (
    <Material.Slider
      value={currentStep}
      min={0}
      max={sortingSteps ? sortingSteps.length - 1 : 1}
      onChange={(e, v) => {
        dispatch(Slice.actions.nextStep());
      }}
    />
  );
}

export function Sort() {
  const classes = useStyles();
  const dispatch = ReactRedux.useDispatch();

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
