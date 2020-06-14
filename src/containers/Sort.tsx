import React from "react";
import * as ReactRedux from "react-redux";
import * as GeneralSlice from "../store/GeneralSlice";
import * as SortingSlice from "../store/SortingSlice";
import * as Material from "@material-ui/core";

export function Sort() {
  const classes = useStyles();
  const dispatch = ReactRedux.useDispatch();
  const currentMethod = ReactRedux.useSelector(GeneralSlice.currentMethod);
  const dataSet = ReactRedux.useSelector(GeneralSlice.dataSet);
  const steps = ReactRedux.useSelector(SortingSlice.sortingSteps);
  const currentStep = ReactRedux.useSelector(SortingSlice.currentStep);
  const isDone = ReactRedux.useSelector(SortingSlice.isDone);

  React.useEffect(() => {
    if ((steps === null || dataSet !== steps[0]) && !isDone) {
      dispatch(SortingSlice.bubble(dataSet));
    }

    setTimeout(() => {
      dispatch(SortingSlice.incrementStep());
    }, 500);
  });

  return (
    <React.Fragment>
      <div className={classes.topContainer}>
        <Material.Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(SortingSlice.bubble(dataSet))}
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
            min={0}
            marks
            max={steps ? steps.length - 1 : 1}
            onChange={(e, v) => {
              dispatch(SortingSlice.incrementStep());
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
