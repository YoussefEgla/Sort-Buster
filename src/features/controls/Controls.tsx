import React from "react";
import { makeStyles, Tabs, Tab, Theme } from "@material-ui/core";
import { TabPanel } from "../../components";
import * as Container from "../../containers/Create";

export function Controls() {
  const [activePanel, setActivePanel] = React.useState("CREATE");

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <Tabs
          orientation="vertical"
          value={activePanel}
          onChange={(e, v) => setActivePanel(v)}
        >
          <Tab label="CREATE" value="CREATE" />
          <Tab label="SORT" value="SORT" />
        </Tabs>
      </div>

      <TabPanel current={activePanel} name="CREATE">
        <Container.Create />
      </TabPanel>
      <TabPanel current={activePanel} name="SORT">
        <span>Sorting Panel</span>
      </TabPanel>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
    width: "50%",
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
