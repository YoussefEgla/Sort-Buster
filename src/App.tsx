import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { Navigation } from "./features/navigation/Navigation";
import { Controls } from "./features/controls/Controls";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navigation />
      <div className={classes.topContainer}>
        <span>Hello</span>
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
