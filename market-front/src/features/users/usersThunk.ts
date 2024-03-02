import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice.ts';
import axiosApi from '../../axiosApi.ts';
import {RootState} from "../../app/store.ts";
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, ValidationError} from "../../types";

export const registerUser = createAsyncThunk<RegisterResponse, RegisterMutation, {rejectValue: ValidationError}>(
  'users/register',
    async (registerMutation, {rejectWithValue}) => {
      try{
        const response = await axiosApi.post('/users', registerMutation);
      return response.data.user;
    }
      catch (e) {
        if(isAxiosError(e) && e.response && e.response.status === 422){
          return rejectWithValue(e.response.data);
        }
        throw e;
      }
  }
);
export const loginUser = createAsyncThunk<RegisterResponse, LoginMutation, { rejectValue: GlobalError}>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try{
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return response.data;
    }catch (e) {
      if(isAxiosError(e) && e.response && e.response.status === 422){
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, undefined, {state: RootState}>(
  'users/logout',
  async (_, {getState, dispatch}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('users/sessions', {headers: {'Authorization': '_bearer'+ token}});
    dispatch(unsetUser());
  }
);