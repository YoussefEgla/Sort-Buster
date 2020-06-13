import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import GeneralReducer from "./GeneralSlice";

export const store = configureStore({
  reducer: {
    general: GeneralReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
