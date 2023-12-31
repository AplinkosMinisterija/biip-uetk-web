import { createSlice } from "@reduxjs/toolkit";
import { Columns } from "../../types";
import { handleToggleColumns } from "../../utils/functions";
import { tenantUsersLabels } from "../../utils/texts";

interface ColumnsState {
  form: Columns;
  tenantUser: Columns;
  request: Columns;
}

const initialState: ColumnsState = {
  form: {},
  tenantUser: tenantUsersLabels,
  request: {}
};

export const TableColumns = createSlice({
  name: "tableColumns",
  initialState,
  reducers: {
    toggleFormColumns: (state, action) => {
      handleToggleColumns(state.form, action.payload);
    },
    toggleTenantUserColumns: (state, action) => {
      handleToggleColumns(state.tenantUser, action.payload);
    },
    toggleRequestColumns: (state, action) => {
      handleToggleColumns(state.request, action.payload);
    },
    handleSetFormColumns: (state, action) => {
      return { ...state, form: action.payload };
    },
    handleSetRequestColumns: (state, action) => {
      return { ...state, request: action.payload };
    }
  }
});

export default TableColumns.reducer;

export const actions = TableColumns.actions;
