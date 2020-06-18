import React from "react";
import * as Material from "@material-ui/core";
import * as ReactRedux from "react-redux";
import { GeneralState, method, actions } from "../store/Slice";

interface NavTabProps {
  value: GeneralState["method"];
  abbr: string;
}

export function NavTab(props: NavTabProps) {
  const dispatch = ReactRedux.useDispatch(),
    currentMethod = ReactRedux.useSelector(method),
    text =
      currentMethod === props.value
        ? props.value.replace(/SORT/, "").trim()
        : props.abbr;

  return (
    <Material.Tab
      label={text}
      onClick={() => dispatch(actions.setMethod(props.value))}
    />
  );
}
