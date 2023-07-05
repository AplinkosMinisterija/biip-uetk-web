import { createSlice } from "@reduxjs/toolkit";
import { FormFilters, UserFilters } from "../../types";

interface FiltersState {
  userFilters: UserFilters;
  formFilters: FormFilters;
}

const initialState: FiltersState = {
  userFilters: {},
  formFilters: {}
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
    }
  }
});

export default Filters.reducer;

export const actions = Filters.actions;
