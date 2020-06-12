import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

interface NavigationState {
  method:
    | "BUBBLE"
    | "SELECTION"
    | "INSERTION"
    | "MERGE"
    | "QUICK"
    | "QUICK RANDOM"
    | "COUNTING"
    | "RADIX";
}

const initialState: NavigationState = {
  method: "BUBBLE",
};

export const NavigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setMethod: (state, action: PayloadAction<NavigationState["method"]>) => {
      state.method = action.payload;
    },
  },
});

export const { setMethod } = NavigationSlice.actions;

export const activeMethod = (state: RootState) => state.navigation.method;

export default NavigationSlice.reducer;
