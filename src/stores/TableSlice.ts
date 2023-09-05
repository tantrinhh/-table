import {
  createSlice,
  createAsyncThunk,
  createAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
export interface Employee {
  id?: string;
  name: string;
  phone: string;
  street: string;
}
export const setCurrentPage = createAction<number>("table/setCurrentPage");
export const setItemsPerPage = createAction<number>("table/setItemsPerPage");
export const setTotalItems = createAction<number>("table/setTotalItems");
//create/edit
export const addData = createAction<Employee>("table/addData");
export const updateData = createAction<Employee>("table/updateData");
export const removeData = createAction<string>("table/removeData");

// Action creators
export const fetchEmployeeData = createAsyncThunk<Employee[], void>(
  "table/fetchEmployeeData",
  async () => {
    const response = await axios.get<Employee[]>(
      "https://6480307ff061e6ec4d48c34b.mockapi.io/api/v1/Employee"
    );
    return response.data;
  }
);

export interface TableState {
  data: Employee[];
  loading: boolean;
  error: string | null;
  searchKeyword: string;
  suggestions: string[];
  deleteStore?: string;
  searchResult: Employee[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  sortField: string;
  sortDirection: "asc" | "desc";
}

const initialState: TableState = {
  data: [],
  loading: false,
  error: null,
  searchKeyword: "",
  suggestions: [],
  searchResult: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  sortField: "",
  deleteStore: undefined,
  sortDirection: "asc",
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    removeRow: (state, action: PayloadAction<string>) => {
      const recordIdToDelete = action.payload;
      state.data = state.data.filter((row) => row.id !== recordIdToDelete);
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
    setSearchResult: (state, action: PayloadAction<Employee[]>) => {
      state.searchResult = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },

    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },

    setStoreDelete: (state, action) => {
      state.deleteStore = action.payload;
    },

    sortTable: (state) => {
      const { sortField, sortDirection, data } = state;

      // Perform the sorting based on the selected sort field and direction
      if (sortField === "name") {
        data.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (nameA < nameB) {
            return sortDirection === "asc" ? -1 : 1;
          }
          if (nameA > nameB) {
            return sortDirection === "asc" ? 1 : -1;
          }
          return 0;
        });
      } else if (sortField === "phone") {
        data.sort((a, b) => {
          const phoneA = a.phone.toLowerCase();
          const phoneB = b.phone.toLowerCase();

          if (phoneA < phoneB) {
            return sortDirection === "asc" ? -1 : 1;
          }
          if (phoneA > phoneB) {
            return sortDirection === "asc" ? 1 : -1;
          }
          return 0;
        });
      } else if (sortField === "street") {
        data.sort((a, b) => {
          const streetA = a.street.toLowerCase();
          const streetB = b.street.toLowerCase();

          if (streetA < streetB) {
            return sortDirection === "asc" ? -1 : 1;
          }
          if (streetA > streetB) {
            return sortDirection === "asc" ? 1 : -1;
          }
          return 0;
        });
      }
    },
    sortByName: (state) => {
      state.sortField = "name";
      state.sortDirection =
        state.sortField === "name" && state.sortDirection === "asc"
          ? "desc"
          : "asc";
    },
    sortByPhone: (state) => {
      state.sortField = "phone";
      state.sortDirection =
        state.sortField === "phone" && state.sortDirection === "asc"
          ? "desc"
          : "asc";
    },
    sortByStreet: (state) => {
      state.sortField = "street";
      state.sortDirection =
        state.sortField === "street" && state.sortDirection === "asc"
          ? "desc"
          : "asc";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeeData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEmployeeData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      state.totalItems = state.data.length;
    });
    builder.addCase(fetchEmployeeData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error occurred";
    });
    builder.addCase(setCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    });
    builder.addCase(setItemsPerPage, (state, action) => {
      state.itemsPerPage = action.payload;
    });
    builder.addCase(setTotalItems, (state, action) => {
      state.totalItems = action.payload;
    });
    builder.addCase(addData, (state, action: PayloadAction<Employee>) => {
      state.data.push(action.payload);
    });

    builder.addCase(updateData, (state, action: PayloadAction<Employee>) => {
      const updatedData = action.payload;
      const index = state.data.findIndex((row) => row.id === updatedData.id);
      if (index !== -1) {
        state.data[index] = updatedData;
      }
    });

    builder.addCase(removeData, (state, action: PayloadAction<string>) => {
      const recordIdToDelete = action.payload;
      state.data = state.data.filter((row) => row.id !== recordIdToDelete);
    });
  },
});

export const {
  removeRow,
  setSearchKeyword,
  setSuggestions,
  setSearchResult,
  changePage,
  setSortField,
  setSortDirection,
  sortTable,
  sortByName,
  sortByPhone,
  sortByStreet,
  setStoreDelete,
} = tableSlice.actions;

export default tableSlice.reducer;
