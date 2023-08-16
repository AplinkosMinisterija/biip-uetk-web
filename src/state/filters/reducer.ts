import { createSlice } from "@reduxjs/toolkit";
import { FormFilters, RequestFilters, UserFilters } from "../../types";

interface FiltersState {
  userFilters: UserFilters;
  formFilters: FormFilters;
  requestFilters: RequestFilters;
}

const initialState: FiltersState = {
  userFilters: {},
  formFilters: {},
  requestFilters: {}
};

export const Filters = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setUserFilters: (state, action) => {
      return { ...state, userFilters: action.payload };
    },
    setFormFilters: (state, action) => {
      return { ...state, formFilters: action.payload };
    },
    setRequestFilters: (state, action) => {
      return { ...state, requestFilters: action.payload };
    }
  }
});

export default Filters.reducer;

export const actions = Filters.actions;
