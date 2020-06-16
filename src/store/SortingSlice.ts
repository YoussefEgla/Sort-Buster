import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./";
import * as utils from "./utils";

export interface SortingState {
  sortingSteps: SORTING_STEPS | null;
  currentStep: number;
  done: boolean;
}

const initialState: SortingState = {
  sortingSteps: null,
  currentStep: 0,
  done: false,
};

const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    incrementStep: (state) => {
      if (
        state.sortingSteps &&
        state.currentStep < state.sortingSteps.length - 1
      ) {
        state.currentStep += 1;
      } else {
        state.done = true;
      }
    },
    decrementStep: (state) => {
      state.currentStep -= 1;
    },
    setDone: (state, action: PayloadAction<boolean>) => {
      state.done = action.payload;
      state.currentStep = 0;
    },
    bubble: (state, action: PayloadAction<DATA_SET>) => {
      state.sortingSteps = utils.bubbleSort(action.payload);
    },
    selection: (state, action) => {},
    insertion: (state, action) => {},
    merge: (state, action) => {},
    quick: (state, action) => {},
    quickRandom: (state, action) => {},
    radix: (state, action) => {},
  },
});

//
// Reducer
//
export default sortingSlice.reducer;

//
// Actions
//
export const {
  bubble,
  selection,
  insertion,
  merge,
  quick,
  quickRandom,
  radix,
  incrementStep,
  decrementStep,
  setDone,
} = sortingSlice.actions;

//
// Selectors
//
export const sortingSteps = (state: RootState) => state.sorting.sortingSteps;
export const isDone = (state: RootState) => state.sorting.done;
export const currentStep = (state: RootState) => state.sorting.currentStep;
