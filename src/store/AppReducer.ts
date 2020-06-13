import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { RootState } from "./";
import * as functions from "./functions";

export interface AppState {
  module: "SORTING";
  method:
    | "BUBBLE"
    | "SELECTION"
    | "INSERTION"
    | "MERGE"
    | "QUICK"
    | "QUICK RANDOM"
    | "COUNTING"
    | "RADIX";
  dataSet: { value: number; id: string }[];
}

const initialState: AppState = {
  module: "SORTING",
  method: "BUBBLE",
  dataSet: functions.randomSet(),
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<"RANDOM" | "SORTED" | "NEARLY SORTED">
    ) => {
      switch (action.payload) {
        case "RANDOM":
          return {
            ...state,
            dataSet: functions.randomSet(),
          };

        case "NEARLY SORTED":
          return state;

        case "SORTED":
          return {
            ...state,
            dataSet: functions.randomSet(true),
          };

        default:
          return state;
      }
    },
    createDefined: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        dataSet: action.payload
          .replace(/[^1-9,]/g, "")
          .trim()
          .split(",")
          .filter((v) => !isNaN(parseInt(v)))
          .map((v, i) => ({ value: parseInt(v), id: `${v}-${i}` })),
      };
    },
    sort: (state, action: PayloadAction<AppState["method"]>) => {
      switch (action.payload) {
        case "BUBBLE":
          return state;
        case "SELECTION":
          return state;
        case "INSERTION":
          return state;
        case "MERGE":
          return state;
        case "QUICK":
          return state;
        case "QUICK RANDOM":
          return state;
        case "RADIX":
          return state;
        default:
          return state;
      }
    },
    setMethod: (state, action: PayloadAction<AppState["method"]>) => ({
      ...state,
      method: action.payload,
    }),
  },
});

export const AppActions = AppSlice.actions;

export const activeMethod = (state: RootState) => state.App.method;
export const currentSet = (state: RootState) => state.App.dataSet;

export default AppSlice.reducer;
