import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import * as Component from "./components";
import * as Container from "./containers";

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Component.Navigation />
      <div className={classes.topContainer}>
        <Container.Viz />
      </div>
      <div className={classes.bottomContainer}>
        <Container.Controls />
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
