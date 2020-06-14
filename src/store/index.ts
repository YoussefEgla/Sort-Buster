import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import GeneralReducer from "./GeneralSlice";
import SortingReducer from "./SortingSlice";

export const store = configureStore({
  reducer: {
    general: GeneralReducer,
    sorting: SortingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
