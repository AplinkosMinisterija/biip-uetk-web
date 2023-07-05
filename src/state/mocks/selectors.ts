import { RootState } from "../store";

const getMocks = (state: RootState) => state;

export const selectors = {
  getFilters: getMocks
};
