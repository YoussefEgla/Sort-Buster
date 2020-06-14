import { createSlice, PayloadAction, Actions } from "@reduxjs/toolkit";
import * as utils from "./utils";
import { RootState } from "./";

export interface GeneralState {
  method: SORTING_METHOD;
  dataSet: DATA_SET;
}

const initialState: GeneralState = {
  method: "BUBBLE SORT",
  dataSet: utils.prepareDataSet(utils.randomSet()),
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setMethod: (state, action: PayloadAction<SORTING_METHOD>) => {
      state.method = action.payload;
    },
    createRandom: (state, action: PayloadAction<CREATE_RANDOM>) => {
      const { len, maxValue } = action.payload;
      state.dataSet = utils.prepareDataSet(utils.randomSet(len, maxValue));
    },
    createSorted: (state, action: PayloadAction<CREATE_SORTED>) => {
      const { len, maxValue, desc } = action.payload;
      state.dataSet = utils.prepareDataSet(
        utils.sortArr(utils.randomSet(len, maxValue), desc)
      );
    },
    createNearlySorted: (
      state,
      action: PayloadAction<CREATE_NEARLY_SORTED>
    ) => {
      const { len, maxValue, desc } = action.payload;

      state.dataSet = utils.prepareDataSet(
        utils.nearlySortArr(utils.randomSet(len, maxValue), desc)
      );
    },
    createUserDefined: (state, action: PayloadAction<string>) => {
      state.dataSet = utils.prepareDataSet(utils.strToArr(action.payload));
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
export const {
  setMethod,
  createRandom,
  createSorted,
  createUserDefined,
  createNearlySorted,
} = generalSlice.actions;

//
// Selectors
//
export const currentMethod = (state: RootState) => state.general.method;
export const dataSet = (state: RootState) => state.general.dataSet;
