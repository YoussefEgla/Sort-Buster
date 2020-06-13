import React from "react";
import * as Material from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  setMethod,
  activeMethod,
} from "../features/navigation/navigationSlice";

interface NavTabProps {
  value:
    | "BUBBLE"
    | "SELECTION"
    | "INSERTION"
    | "MERGE"
    | "QUICK"
    | "QUICK RANDOM"
    | "COUNTING"
    | "RADIX";
  abbr: string;
}

export function NavTab(props: NavTabProps) {
  const dispatch = useDispatch();
  const method = useSelector(activeMethod);
  const { value, abbr } = props;

  const text = method === value ? value : abbr;

  return (
    <Material.Tab label={text} onClick={() => dispatch(setMethod(value))} />
  );
}
