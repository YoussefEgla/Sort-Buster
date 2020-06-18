import { createSlice, PayloadAction, Actions } from "@reduxjs/toolkit";
import * as utils from "./utils";
import { RootState, AppThunk } from ".";

export interface GeneralState {
  method: SORTING_METHOD;
  dataSet: DATA_SET;
  sortingSteps: SORTING_STEPS;
  currentStep: number;
  areStepsDone: boolean;
  interval: NodeJS.Timeout | 0;
  playback: "PLAYING" | "PAUSED";
  speed: number;
}

const initialDataSet = utils.prepareDataSet(utils.randomSet());

const initialState: GeneralState = {
  method: "BUBBLE SORT",
  dataSet: initialDataSet,
  sortingSteps: utils.generateSteps("BUBBLE SORT")(initialDataSet),
  currentStep: 0,
  areStepsDone: false,
  interval: 0,
  playback: "PAUSED",
  speed: 1000,
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
      state.currentStep = 0;
    },
    //
    // Create action
    //
    create(state, action: PayloadAction<CREATE>) {
      clearInterval(state.interval as NodeJS.Timeout);
      state.playback = "PAUSED";
      state.interval = 0;

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
      state.currentStep = 0;
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
        state.playback = "PAUSED";
        clearInterval(state.interval as NodeJS.Timeout);
        state.interval = 0;
      }
    },
    prevStep(state) {
      if (state.sortingSteps && state.currentStep > 0) {
        state.currentStep -= 1;
        state.areStepsDone = false;
      }
    },
    goToStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    //
    // Play / Pause
    //
    play(state, action: PayloadAction<NodeJS.Timeout>) {
      state.interval = action.payload;
      state.playback = "PLAYING";
    },
    pause(state) {
      if (state.playback === "PLAYING") {
        clearInterval(state.interval as NodeJS.Timeout);
        state.interval = 0;
        state.playback = "PAUSED";
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

const playAsync = (): AppThunk => (dispatch, state) => {
  const rootState = state();

  if (
    rootState.general.playback === "PAUSED" &&
    rootState.general.interval === 0 &&
    rootState.general.sortingSteps.length > 1
  ) {
    console.log("Hello");

    const interval = setInterval(() => {
      dispatch(actions.nextStep());
    }, rootState.general.speed);
    dispatch(actions.play(interval));
  }
};

//
// Reducer
//
export default generalSlice.reducer;

//
// Actions
//
export const actions = { ...generalSlice.actions, playAsync };

//
// Selectors
//
export const method = (state: RootState) => state.general.method;
export const dataSet = (state: RootState) => state.general.dataSet;
export const sortingSteps = (state: RootState) => state.general.sortingSteps;
export const currentStep = (state: RootState) => state.general.currentStep;
export const areStepsDone = (state: RootState) => state.general.areStepsDone;
export const playback = (state: RootState) => state.general.playback;
