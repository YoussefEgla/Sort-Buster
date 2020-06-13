import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { create, sort, createUserDefined } from "./controlsSlice";
import { activeMethod } from "../../store/AppReducer";
import {
  makeStyles,
  Button,
  Tabs,
  Tab,
  Theme,
  TextField,
  Divider,
} from "@material-ui/core";
import { TabPanel } from "../../components";

export function Controls() {
  const method = useSelector(activeMethod);
  const dispatch = useDispatch();

  const [activePanel, setActivePanel] = React.useState("CREATE");
  const [createInput, setCreateInput] = React.useState("23, 27, 13, 5");

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "75%",
            margin: "0 auto 25px auto",
          }}
        >
          <Button
            onClick={() => dispatch(create("RANDOM"))}
            variant="contained"
            color="primary"
          >
            Random set
          </Button>
          <Button
            onClick={() => dispatch(create("SORTED"))}
            variant="contained"
            color="primary"
          >
            Sorted set
          </Button>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "75%",
            margin: "25px auto 0 auto",
          }}
        >
          <TextField
            id="user-defined-set"
            label="Custom Set"
            helperText="Comma separated numbers"
            value={createInput}
            onChange={(e) => setCreateInput(e.target.value)}
          />
          <div style={{ margin: "auto 0" }}>
            <Button
              onClick={() => dispatch(createUserDefined(createInput))}
              variant="contained"
              color="primary"
            >
              Custom Set
            </Button>
          </div>
        </div>
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
