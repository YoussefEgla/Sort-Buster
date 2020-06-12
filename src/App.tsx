import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core";
import { Navigation } from "./features/navigation/Navigation";
import { Controls } from "./features/controls/Controls";
import { currentSet } from "./features/controls/controlsSlice";
import { scaleLinear } from "d3-scale";
import { Bar } from "./components/Bar";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const data = useSelector(currentSet);

  const width = data.length * 25;

  const linearScale = scaleLinear()
    .domain([Math.min(...data) - 1, Math.max(...data)])
    .range([0, 100]);

  const v = linearScale(Math.max(...data));
  const bars = data.map((v, i) => (
    <Bar height={linearScale(v)} x={i * 25} value={v} key={i} />
  ));

  return (
    <div className={classes.root}>
      <Navigation />
      <div className={classes.topContainer}>
        <svg
          width={width}
          height="100"
          style={{ margin: "auto" }}
          transform="scale(1, -1) translate(0, -100)"
        >
          {bars}
        </svg>
      </div>
      <div className={classes.bottomContainer}>
        <Controls />
        <div>Code Explaination</div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topContainer: {
    minHeight: "55vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    height: "36.9vh",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

export default App;
