import {createSlice} from '@reduxjs/toolkit';
import {loginExtraReducer, signupExtraReducer} from './UserExtraReducers';
import {login, signUp} from './UserThunkAction';

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
  },
});

const userActions = {...actions, signUp, login};
export {userActions, userReducer};
