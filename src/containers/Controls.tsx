import React from "react";
import * as Material from "@material-ui/core";
import * as Component from "../components";
import * as Container from "./";

import GitHubIcon from "@material-ui/icons/GitHub";

export function Controls() {
  const [activePanel, setActivePanel] = React.useState("CREATE");

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <Material.Tabs
          orientation="vertical"
          value={activePanel}
          onChange={(e, v) => setActivePanel(v)}
        >
          <Material.Tab label="CREATE" value="CREATE" />
          <Material.Tab label="SORT" value="SORT" />
          <a
            href="https://github.com/YoussefEgla/Sort-Buster"
            style={{ margin: "25px auto  auto", color: "white" }}
          >
            <GitHubIcon />
          </a>
        </Material.Tabs>
      </div>

      <Component.TabPanel current={activePanel} name="CREATE">
        <Container.Create />
      </Component.TabPanel>
      <Component.TabPanel current={activePanel} name="SORT">
        <Container.Sort />
      </Component.TabPanel>
    </div>
  );
}

const useStyles = Material.makeStyles((theme: Material.Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
    width: "65%",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabs: {
    color: "white",
    backgroundColor: "black",
    display: "flex",
    height: "100%",
    alignItems: "center",
  },
}));
