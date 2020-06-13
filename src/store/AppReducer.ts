import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./";

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
  dataSet: [],
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
          return state;

        case "NEARLY SORTED":
          return state;

        case "SORTED":
          return state;

        default:
          return state;
      }
    },
    createDefined: (state, action: PayloadAction<AppState["dataSet"]>) => {
      return { ...state, dataSet: action.payload };
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

export default AppSlice.reducer;
