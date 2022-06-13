import {createSlice} from '@reduxjs/toolkit';
import {
  loginExtraReducer,
  signupExtraReducer,
  logoutExtraReducer,
} from './UserExtraReducers';
import {login, signUp, logout} from './UserThunkAction';

const initialState = {
  info: null,
};

const {actions, reducer: userReducer} = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    ...signupExtraReducer,
    ...loginExtraReducer,
    ...logoutExtraReducer,
  },
});

const userActions = {...actions, signUp, login, logout};
export {userActions, userReducer};
