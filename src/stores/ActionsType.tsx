import type { PayloadAction } from "@reduxjs/toolkit";
import { Employee, Todo } from "./emplyeeSlice";

export type ActionTypes = {
  initData: (
    state: Todo,
    action: PayloadAction<{ newData: Employee[] }>
  ) => void;
  addTodo: (
    state: Todo,
    action: PayloadAction<{ newData: Employee[] }>
  ) => void;
};
