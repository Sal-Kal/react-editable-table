import { configureStore } from "@reduxjs/toolkit";
import tableDataReducer from "./tableDataSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    tableData: tableDataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
