import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import modalReducer from "../features/home/modal-slice";
import threadReducer from "../features/home/threads-slice";
import threadDetailReducer from "../features/detail/detail-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    threads: threadReducer,
    detailThread: threadDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
