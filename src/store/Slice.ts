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
  playback: "PLAYING" | "PAUSED" | "FINISHED";
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
  speed: 50,
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

      if (state.playback === "FINISHED") {
        state.playback = "PAUSED";
      }
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
    step(state, action: PayloadAction<STEP>) {
      switch (action.payload.type) {
        case "STEP FORWARD": {
          if (state.currentStep < state.sortingSteps.length - 1) {
            state.currentStep += 1;
          } else {
            state.areStepsDone = true;
            state.playback = "FINISHED";
            clearInterval(state.interval as NodeJS.Timeout);
            state.interval = 0;
          }

          break;
        }

        case "STEP BACKWARD": {
          if (state.sortingSteps && state.currentStep > 0) {
            state.currentStep -= 1;
            state.areStepsDone = false;
          }

          break;
        }

        case "STEP TO": {
          state.currentStep = action.payload.index;

          break;
        }
      }
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
    resetPlay(state) {
      state.currentStep = 0;
      state.areStepsDone = false;
      state.playback = "PAUSED";
    },
    changeSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
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
    const interval = setInterval(() => {
      dispatch(actions.step({ type: "STEP FORWARD" }));
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
export const playSpeed = (state: RootState) => state.general.speed;
