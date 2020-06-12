import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMethod, activeMethod } from "./navigationSlice";
import { makeStyles, Button, Tabs, Tab } from "@material-ui/core";

interface AbbrProps {
  label: string;
  abbr: string;
}

function Abbr(props: AbbrProps) {
  const method = useSelector(activeMethod);

  return <span>{method === props.label ? props.label : props.abbr}</span>;
}

export function Navigation() {
  const method = useSelector(activeMethod);
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <nav className={classes.root}>
      <div className={classes.container}>
        <Button variant="text" style={{ color: "white", width: "150px" }}>
          Sort Buster
        </Button>
        <Tabs
          value={method}
          indicatorColor="secondary"
          textColor="inherit"
          onChange={(e, v) => dispatch(setMethod(v))}
          scrollButtons="auto"
          variant="scrollable"
          color="primary"
          className={classes.methods}
        >
          <Tab label={<Abbr label="BUBBLE" abbr="BBL"></Abbr>} value="BUBBLE" />
          <Tab
            label={<Abbr label="SELECTION" abbr="SEL"></Abbr>}
            value="SELECTION"
          />
          <Tab
            label={<Abbr label="INSERTION" abbr="INS"></Abbr>}
            value="INSERTION"
          />
          <Tab label={<Abbr label="MERGE" abbr="MRG"></Abbr>} value="MERGE" />
          <Tab label={<Abbr label="QUICK" abbr="QUI"></Abbr>} value="QUICK" />
          <Tab
            label={<Abbr label="RANDOM QUICK" abbr="R-Q"></Abbr>}
            value="RANDOM_QUICK"
          />
          <Tab
            label={<Abbr label="COUNTING" abbr="COU"></Abbr>}
            value="COUNTING"
          />
          <Tab label={<Abbr label="RADIX" abbr="RDX"></Abbr>} value="RADIX" />
        </Tabs>
      </div>
    </nav>
  );
}

const useStyles = makeStyles({
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
