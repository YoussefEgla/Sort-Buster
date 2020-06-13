import React from "react";
import * as ReactRedux from "react-redux";
import * as Material from "@material-ui/core";

import { activeMethod } from "../features/navigation/navigationSlice";
import { NavTab } from "./NavTab";

export function Navigation() {
  const method = ReactRedux.useSelector(activeMethod);

  const classes = useStyles();

  return (
    <nav className={classes.root}>
      <div className={classes.container}>
        <Material.Button style={{ color: "white", width: "150px" }}>
          Sort Buster
        </Material.Button>

        <Material.Tabs
          value={method}
          indicatorColor="secondary"
          scrollButtons="auto"
          variant="scrollable"
          className={classes.methods}
        >
          <NavTab value="BUBBLE" abbr="BBL" />
          <NavTab value="SELECTION" abbr="SEL" />
          <NavTab value="INSERTION" abbr="INS" />
          <NavTab value="MERGE" abbr="MRG" />
          <NavTab value="QUICK" abbr="QUI" />
          <NavTab value="QUICK RANDOM" abbr="R-Q" />
          <NavTab value="COUNTING" abbr="COU" />
          <NavTab value="RADIX" abbr="RDX" />
        </Material.Tabs>
      </div>
    </nav>
  );
}

const useStyles = Material.makeStyles({
  root: {
    width: "100%",
    height: "8vh",
    backgroundColor: "black",
  },
  container: {
    width: "85%",
    height: "100%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    justifyItems: "center",
  },
  methods: {
    width: "90%",
    color: "white",
    display: "flex",
    alignItems: "center",
  },
});
