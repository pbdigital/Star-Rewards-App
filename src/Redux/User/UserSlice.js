import {createSlice} from '@reduxjs/toolkit';
import {
  loginExtraReducer,
  signupExtraReducer,
  logoutExtraReducer,
  updateUserExtraReducer,
} from './UserExtraReducers';
import {login, signUp, logout, updateUserInfo} from './UserThunkAction';
import { USER_TYPE } from '../../Constants';

const initialState = {
  info: null,
  isLoading: false,
  isDoneTutorial: false,
  isReadOnly: false,
};

const {actions, reducer: userReducer} = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsDoneTutorial: (state, action) => {
      state.isDoneTutorial = action.payload;
    },
    setIsReadOnly: (state, action) => {
      state.isReadOnly = action.payload === USER_TYPE.child;
    },
  },
  extraReducers: {
    ...signupExtraReducer,
    ...loginExtraReducer,
    ...logoutExtraReducer,
    ...updateUserExtraReducer,
  },
});

const userActions = {
  ...actions,
  signUp,
  login,
  logout,
  updateUserInfo,
};
export {userActions, userReducer};
