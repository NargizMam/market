import { GlobalError, User, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './usersThunk.ts';
import {RootState} from "../../app/store.ts";

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null
};
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser:(state) => {
      state.user = null;
    }
  },
  extraReducers: (builder => {
    builder.addCase(registerUser.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(registerUser.fulfilled, (state, {payload: data}) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(registerUser.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(loginUser.fulfilled, (state, {payload: data}) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(loginUser.rejected, (state, {payload: error}) => {
      state.loginLoading = true;
      state.loginError = error || null;
    });
  })
});
export const usersReducer = userSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const {unsetUser} = userSlice.actions;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
