import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tableDataSlice = createSlice({
  name: "tableData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTableDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTableDataSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTableDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  fetchTableDataStart,
  fetchTableDataSuccess,
  fetchTableDataFailure,
  updateData,
} = tableDataSlice.actions;

export const fetchTableData = () => async (dispatch) => {
  dispatch(fetchTableDataStart());

  try {
    const response = await axios.get("http://localhost:8000/get/api/configs");
    dispatch(fetchTableDataSuccess(response.data.response));
  } catch (error) {
    dispatch(fetchTableDataFailure(error.message));
  }
};

export default tableDataSlice.reducer;
