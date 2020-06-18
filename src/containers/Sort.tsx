import React from "react";
import * as ReactRedux from "react-redux";
import * as Slice from "../store/Slice";
import * as Material from "@material-ui/core";

export function Sort() {
  const classes = useStyles();
  const dispatch = ReactRedux.useDispatch();
  const sortingSteps = ReactRedux.useSelector(Slice.sortingSteps);
  const currentStep = ReactRedux.useSelector(Slice.currentStep);
  const isDone = ReactRedux.useSelector(Slice.areStepsDone);

  React.useEffect(() => {
    // dispatch(Slice.actions.sort());
    // } else if (sortingSteps !== null && dataSet !== steps[0] && isDone) {
    //   dispatch(Slice.actions.setDone(false));
    // }
  });

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
          <Material.Slider
            value={currentStep}
            step={1}
            min={1}
            marks
            max={sortingSteps ? sortingSteps.length - 1 : 1}
            onChange={(e, v) => {
              dispatch(Slice.actions.nextStep());
            }}
          />
        </div>
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
    justifyContent: "space-between",
    width: "75%",
    margin: "25px auto 0 auto",
  },
  slider: {
    width: "50%",
    margin: "auto",
  },
}));
