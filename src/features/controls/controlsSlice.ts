import {
  createSlice,
  PayloadAction,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  PayloadActionCreator,
  ActionCreatorWithPreparedPayload,
  ActionCreator,
  Action,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store";

import { NavigationState } from "../navigation/navigationSlice";

function createRandomSet() {
  return Array.from({
    length: Math.round(Math.random() * 100),
  }).map(() => Math.round(Math.random() * 500));
}

interface ControlsState {
  currentSet: number[];
  steps?: number[][];
}

const initialState: ControlsState = {
  currentSet: createRandomSet(),
};

export const ControlsSlice = createSlice({
  name: "controls",
  initialState,
  reducers: {
    create: (state, action: PayloadAction<"RANDOM" | "SORTED">) => {
      switch (action.payload) {
        case "RANDOM":
          return { ...state, currentSet: createRandomSet() };

        case "SORTED":
          return {
            ...state,
            currentSet: createRandomSet().sort((a, b) => a - b),
          };

        default:
          return state;
      }
    },
    createUserDefined: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentSet: action.payload
          .replace(/[^1-9,]/g, "")
          .trim()
          .split(",")
          .filter((v) => !isNaN(parseInt(v)))
          .map((v) => parseInt(v)),
      };
    },
    sort: (state, action: PayloadAction<NavigationState["method"]>) => {
      switch (action.payload) {
        case "BUBBLE":
          break;

        case "SELECTION":
          break;

        default:
          return state;
      }
    },
  },
});

export const { create, sort, createUserDefined } = ControlsSlice.actions;

export const sortSteps = (state: RootState) => state.controls.steps;
export const currentSet = (state: RootState) => state.controls.currentSet;

export default ControlsSlice.reducer;
