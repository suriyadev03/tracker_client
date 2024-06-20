import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean
}
interface BaseState {
  isLoading: boolean;
  error: string | null;
  users: User[];
  isAuthenticated: boolean;
}
const initialState: BaseState = { isLoading: false, error: null, users: [], isAuthenticated: false };

const baseReducer = createSlice({
  name: "base",
  initialState,
  reducers: {
    userDetails(state, action) {
      state.users.push(action.payload)
    },
    setAuthenticate(state) {
      state.isAuthenticated = true
    },
    startLoading(state) {
      state.isLoading = true;
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
});

export const { startLoading, stopLoading, setError, clearError, userDetails, setAuthenticate } = baseReducer.actions;

export default baseReducer.reducer;
