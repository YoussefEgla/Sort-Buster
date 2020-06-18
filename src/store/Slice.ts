import { createSlice, PayloadAction, Actions } from "@reduxjs/toolkit";
import * as utils from "./utils";
import { RootState } from ".";

export interface GeneralState {
  method: SORTING_METHOD;
  dataSet: DATA_SET;
  sortingSteps: SORTING_STEPS | null;
  currentStep: number;
  areStepsDone: boolean;
  playSpeed: number;
  pause: NodeJS.Timeout | 0;
}

const initialDataSet = utils.prepareDataSet(utils.randomSet());

const initialState: GeneralState = {
  method: "BUBBLE SORT",
  dataSet: initialDataSet,
  sortingSteps: utils.generateSteps("BUBBLE SORT")(initialDataSet),
  currentStep: 0,
  areStepsDone: false,
  playSpeed: 1000,
  pause: 0,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    //
    // Set current sorting method
    //
    setMethod(state, action: PayloadAction<SORTING_METHOD>) {
      state.method = action.payload;
      state.sortingSteps = utils.generateSteps(state.method)(state.dataSet);
    },
    //
    // Create action
    //
    create(state, action: PayloadAction<CREATE>) {
      switch (action.payload.type) {
        case "RANDOM": {
          const { len, maxValue } = action.payload;
          state.dataSet = utils.prepareDataSet(utils.randomSet(len, maxValue));

          break;
        }

        case "SORTED": {
          const { len, maxValue, desc } = action.payload;
          state.dataSet = utils.prepareDataSet(
            utils.sortArr(utils.randomSet(len, maxValue), desc)
          );

          break;
        }

        case "NEARLY SORTED": {
          const { len, maxValue, desc } = action.payload;
          state.dataSet = utils.prepareDataSet(
            utils.nearlySortArr(utils.randomSet(len, maxValue), desc)
          );

          break;
        }

        case "USER DEFINED": {
          const { data } = action.payload;
          state.dataSet = utils.prepareDataSet(utils.strToArr(data));

          break;
        }
      }
      state.sortingSteps = utils.generateSteps(state.method)(state.dataSet);
    },

    //
    // Step through actions
    //
    nextStep(state) {
      if (
        state.sortingSteps &&
        state.currentStep < state.sortingSteps.length - 1
      ) {
        state.currentStep += 1;
      } else {
        state.areStepsDone = true;
      }
    },
    prevStep(state) {
      if (state.sortingSteps && state.currentStep > 0) {
        state.currentStep -= 1;
        state.areStepsDone = false;
      }
    },
    //
    // Play / Pause
    //
    play(state) {
      state.pause = setInterval(() => {
        this.nextStep(state);
      }, state.playSpeed);
    },
    pause(state) {
      if (state.pause) {
        clearInterval(state.pause);
      }
    },
    //
    // Generate Sorting Steps
    //
    sort(state) {
      if (
        (state.sortingSteps === null ||
          state.dataSet !== state.sortingSteps[0]) &&
        !state.areStepsDone
      ) {
        switch (state.method) {
          case "BUBBLE SORT":
            state.sortingSteps = utils.bubbleSort(state.dataSet);
        }
      }
    },
  },
});

//
// Reducer
//
export default generalSlice.reducer;

//
// Actions
//
export const actions = generalSlice.actions;

//
// Selectors
//
export const method = (state: RootState) => state.general.method;
export const dataSet = (state: RootState) => state.general.dataSet;
export const sortingSteps = (state: RootState) => state.general.sortingSteps;
export const currentStep = (state: RootState) => state.general.currentStep;
export const areStepsDone = (state: RootState) => state.general.areStepsDone;
