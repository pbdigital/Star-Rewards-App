import {createSlice} from '@reduxjs/toolkit';
import {
  loginExtraReducer,
  signupExtraReducer,
  logoutExtraReducer,
  updateUserExtraReducer,
} from './UserExtraReducers';
import {login, signUp, logout, updateUserInfo} from './UserThunkAction';

const initialState = {
  info: null,
  isLoading: false,
  isDoneTutorial: false,
  authenticatedUserType: null,
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
    setAuthenticationType: (state, action) => {
      state.authenticatedUserType = action.payload;
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
