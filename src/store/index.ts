import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import controlsReducer from "../features/controls/controlsSlice";
import AppReducer from "./AppReducer";

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    App: AppReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
