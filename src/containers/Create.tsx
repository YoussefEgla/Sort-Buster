import React from "react";
import * as ReactRedux from "react-redux";
import * as Material from "@material-ui/core";
import { actions } from "../store/Slice";

export function Create() {
  const dispatch = ReactRedux.useDispatch();

  const [len, setLen] = React.useState(0);
  const [maxValue, setmaxVal] = React.useState<number | undefined>(100);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          margin: "0 auto 25px auto",
        }}
      >
        <Material.Button
          onClick={() =>
            dispatch(
              actions.create({
                type: "RANDOM",
                len: len ? len : undefined,
                maxValue,
              })
            )
          }
          variant="contained"
          color="primary"
        >
          Random set
        </Material.Button>
        <Material.Button
          onClick={() =>
            dispatch(
              actions.create({
                type: "NEARLY SORTED",
                len: len ? len : undefined,
                maxValue,
              })
            )
          }
          variant="contained"
          color="primary"
        >
          Nearly Sorted
        </Material.Button>
        <Material.Button
          onClick={() =>
            dispatch(
              actions.create({
                type: "SORTED",
                len: len ? len : undefined,
                maxValue,
              })
            )
          }
          variant="contained"
          color="primary"
        >
          Sorted set
        </Material.Button>
        <Material.Button
          onClick={() =>
            dispatch(
              actions.create({
                type: "SORTED",
                desc: true,
                len: len ? len : undefined,
              })
            )
          }
          variant="contained"
          color="primary"
        >
          Reversed
        </Material.Button>
      </div>
      <Material.Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          margin: "25px auto 0 auto",
        }}
      >
        <Material.TextField
          id="user-defined-set"
          label="Custom Set"
          helperText="Comma separated numbers"
          defaultValue="23, 27, 13, 5"
          onChange={(e) =>
            dispatch(
              actions.create({ type: "USER DEFINED", data: e.target.value })
            )
          }
        />
        <Material.TextField
          label="Max value"
          type="number"
          helperText="num <= 0 = undefined"
          onChange={(e) => {
            const v =
              parseInt(e.target.value) <= 0
                ? undefined
                : parseInt(e.target.value);
            setmaxVal(v);
            dispatch(actions.create({ type: "RANDOM", len, maxValue: v }));
          }}
          style={{ width: "150px" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Material.TextField
          label="Dataset length"
          helperText={`len < 0 || null = random`}
          type="number"
          onChange={(e) => {
            const v =
              parseInt(e.target.value) < 0
                ? 0
                : parseInt(e.target.value) > 50
                ? 50
                : parseInt(e.target.value);
            setLen(v);
            dispatch(actions.create({ type: "RANDOM", len: v }));
          }}
          style={{ width: "150px" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </React.Fragment>
  );
}
