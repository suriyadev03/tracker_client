import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import baseService from "../../service/baseService";

interface BaseState {
  isLoading: boolean;
  error: string | null;
  users: User[];
  isAuthenticated: boolean;
  loggedUser: any;
  usersBirthDays: User[]
}
const initialState: BaseState = {
  isLoading: false,
  error: null,
  users: [],
  isAuthenticated: false,
  loggedUser: [],
  usersBirthDays: []
};

const baseReducer = createSlice({
  name: "base",
  initialState,
  reducers: {
    userDetails(state, action) {
      state.users = action.payload
    },
    LoggedUserDetails(state, action) {
      state.loggedUser = action.payload
    },
    BirthDayDetails(state, action) {
      state.usersBirthDays = action.payload
    },
    setAuthenticate(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    startLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(baseService.endpoints.loginUser.matchPending, (state, action) => {
      console.log(state, action, "extraReducers");
    })
    builder.addMatcher(baseService.endpoints.loginUser.matchFulfilled, (state, action) => {
      console.log(state, action, "extraReducers");
    })
    builder.addMatcher(baseService.endpoints.loginUser.matchRejected, (state, action) => {
      console.log(state, action, "extraReducers");
    })
  },
});

export const { startLoading, stopLoading, setError, clearError, userDetails, setAuthenticate, LoggedUserDetails, BirthDayDetails } = baseReducer.actions;

export default baseReducer.reducer;
