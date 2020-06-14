import React from "react";
import * as ReactRedux from "react-redux";
import * as Material from "@material-ui/core";
import * as GeneralSlice from "../store/GeneralSlice";

export function Create() {
  const dispatch = ReactRedux.useDispatch();

  const [createInput, setCreateInput] = React.useState("23, 27, 13, 5");

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
          onClick={() => dispatch(GeneralSlice.createRandom({}))}
          variant="contained"
          color="primary"
        >
          Random set
        </Material.Button>
        <Material.Button
          onClick={() => dispatch(GeneralSlice.createSorted({}))}
          variant="contained"
          color="primary"
        >
          Nearly Sorted
        </Material.Button>
        <Material.Button
          onClick={() => dispatch(GeneralSlice.createSorted({}))}
          variant="contained"
          color="primary"
        >
          Sorted set
        </Material.Button>
      </div>
      <Material.Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "75%",
          margin: "25px auto 0 auto",
        }}
      >
        <Material.TextField
          id="user-defined-set"
          label="Custom Set"
          helperText="Comma separated numbers"
          value={createInput}
          onChange={(e) => setCreateInput(e.target.value)}
        />
        <div style={{ margin: "auto 0" }}>
          <Material.Button
            onClick={() =>
              dispatch(GeneralSlice.createUserDefined(createInput))
            }
            variant="contained"
            color="primary"
          >
            Custom Set
          </Material.Button>
        </div>
      </div>
    </React.Fragment>
  );
}
