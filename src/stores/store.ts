import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./emplyeeSlice";

export const initStore = () => {
  return configureStore({
    reducer: { Todo: TodoReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

const store = initStore();

export type RootState = ReturnType<typeof store.getState>;

export default store;
