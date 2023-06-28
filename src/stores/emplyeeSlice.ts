import { createSlice } from "@reduxjs/toolkit";
import type { ActionTypes } from "./ActionsType";

// Define a type for the slice state
export type Todo = {
  data: Employee[];
};

export type Employee = {
  id?: number;
  name?: string;
  phone?: string;
  street?: string;
  [key: string]: any | undefined; // Thêm chỉ mục kiểu 'string' vào đây
};

// Define the initial state using that type
const initialState: Todo = {
  data: [],
};

export const counterSlice = createSlice<Todo, ActionTypes>({
  name: "counter",

  initialState: initialState as Todo,
  reducers: {
    initData: (state, action) => {
      const { newData } = action.payload;

      state.data = newData;
    },

    addTodo: (state, action) => {
      const { newData } = action.payload;
      console.log("newData", newData);

      state.data = newData;
    },
  },
});

export const { addTodo, initData } = counterSlice.actions;

export default counterSlice.reducer;
