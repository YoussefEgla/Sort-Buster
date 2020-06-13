import React from "react";
import * as Material from "@material-ui/core";
import * as ReactRedux from "react-redux";
import { AppActions, activeMethod, AppState } from "../store/AppReducer";

interface NavTabProps {
  value: AppState["method"];
  abbr: string;
}

export function NavTab(props: NavTabProps) {
  const dispatch = ReactRedux.useDispatch(),
    method = ReactRedux.useSelector(activeMethod),
    text = method === props.value ? props.value : props.abbr;

  return (
    <Material.Tab
      label={text}
      onClick={() => dispatch(AppActions.setMethod(props.value))}
    />
  );
}
