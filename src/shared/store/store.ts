import { configureStore } from "@reduxjs/toolkit";
import uiPreferencesReducer from "@/features/ui-preferences/model/ui-preferences-slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      uiPreferences: uiPreferencesReducer
    },
    devTools: process.env.NODE_ENV !== "production"
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
