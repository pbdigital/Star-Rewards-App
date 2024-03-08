import {AuthService} from 'Services/AuthService';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {childActions} from '../Child/ChildSlice';
import {userActions} from './UserSlice';

export const signUp = createAsyncThunk(
  'sign_up',
  async ({firstName, email, password}) => {
    try {
      const response = await AuthService.signUp({
        firstName,
        email,
        password,
      });
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const login = createAsyncThunk('login', async ({email, password}) => {
  try {
    const response = await AuthService.login({
      email,
      password,
    });
    return response.data;
  } catch (err) {
    return {err};
  }
});

export const loginApple = createAsyncThunk('loginApple', async ({token}) => {
  try {
    const response = await AuthService.loginApple({token});
    return response.data;
  } catch (err) {
    return {err};
  }
});

export const logout = createAsyncThunk('logout', async (_, {dispatch}) => {
  await dispatch(childActions.resetChildInfo());
  await dispatch(userActions.setIsDoneTutorial(false));
  return true;
});

export const updateUserInfo = createAsyncThunk(
  'update_user_info',
  async ({firstName, email, password}) => {
    try {
      const response = await AuthService.updateUserInfo({
        firstName,
        email,
        password,
      });
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);
