import React from "react";
import * as Material from "@material-ui/core";

interface TabPanelProps {
  children?: React.ReactNode;
  name: any;
  current: any;
}

export function TabPanel(props: TabPanelProps) {
  const { children, name, current, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={current !== name}
      {...other}
      style={{
        overflow: "hidden",
        width: "100%",
      }}
    >
      {current === name && (
        <Material.Slide
          direction="up"
          in={current === name}
          mountOnEnter
          unmountOnExit
        >
          <Material.Box p={3}>{children}</Material.Box>
        </Material.Slide>
      )}
    </div>
  );
}
