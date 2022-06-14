import {createSlice} from '@reduxjs/toolkit';
import {
  loginExtraReducer,
  signupExtraReducer,
  logoutExtraReducer,
} from './UserExtraReducers';
import {login, signUp, logout} from './UserThunkAction';

const initialState = {
  info: null,
  isLoading: false,
};

const {actions, reducer: userReducer} = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    ...signupExtraReducer,
    ...loginExtraReducer,
    ...logoutExtraReducer,
  },
});

const userActions = {...actions, signUp, login, logout};
export {userActions, userReducer};
