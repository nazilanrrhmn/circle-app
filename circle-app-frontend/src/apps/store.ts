import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import modalReducer from "../features/home/modal-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
