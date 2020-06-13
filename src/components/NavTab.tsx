import React from "react";
import * as Material from "@material-ui/core";
import * as ReactRedux from "react-redux";
import * as GeneralSlice from "../store/GeneralSlice";
import { GeneralState } from "../store/GeneralSlice";

interface NavTabProps {
  value: GeneralState["method"];
  abbr: string;
}

export function NavTab(props: NavTabProps) {
  const dispatch = ReactRedux.useDispatch(),
    currentMethod = ReactRedux.useSelector(GeneralSlice.currentMethod),
    text =
      currentMethod === props.value
        ? props.value.replace(/SORT/, "").trim()
        : props.abbr;

  return (
    <Material.Tab
      label={text}
      onClick={() => dispatch(GeneralSlice.setMethod(props.value))}
    />
  );
}
