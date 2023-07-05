import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface Mocks {
  users: User[];
}

const initialState: Mocks = {
  users: [
    {
      id: "1",
      firstName: "test",
      lastName: "test",
      personalCode: "codee2222",
      email: "test@gmail.com",
      phone: "862233123"
    },
    {
      id: "2",
      firstName: "test2",
      lastName: "test2",
      personalCode: "code2222",
      email: "test2@gmail.com",
      phone: "862233121"
    }
  ]
};

export const Mocks = createSlice({
  name: "mocks",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        users: [
          ...state.users,
          { id: state.users.length + 1, ...action.payload }
        ]
      };
    }
  }
});

export default Mocks.reducer;

export const actions = Mocks.actions;
