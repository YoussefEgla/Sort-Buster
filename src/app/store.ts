import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import navigationReducer from "../features/navigation/navigationSlice";
import controlsReducer from "../features/controls/controlsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    navigation: navigationReducer,
    controls: controlsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
