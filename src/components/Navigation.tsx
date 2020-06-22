import React from "react";
import * as ReactRedux from "react-redux";
import * as Material from "@material-ui/core";
import * as ReduxSlice from "../store/Slice";
import { NavTab } from "./NavTab";

export function Navigation() {
  const currentMethod = ReactRedux.useSelector(ReduxSlice.method);

  const classes = useStyles();

  return (
    <nav className={classes.root}>
      <div className={classes.container}>
        <Material.Button style={{ color: "white", width: "150px" }}>
          Sort Buster
        </Material.Button>

        <Material.Tabs
          value={currentMethod}
          indicatorColor="secondary"
          scrollButtons="auto"
          variant="scrollable"
          className={classes.methods}
        >
          <NavTab value="BUBBLE SORT" abbr="BBL" />
          <NavTab value="SELECTION SORT" abbr="SEL" />
          <NavTab value="INSERTION SORT" abbr="INS" />
          <NavTab value="COCKTAIL SORT" abbr="CKT" />
          <NavTab value="QUICK SORT" abbr="QUI" />
          <NavTab value="RANDOM QUICK SORT" abbr="R-Q" />
          <NavTab value="HEAP SORT" abbr="HEA" />
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
