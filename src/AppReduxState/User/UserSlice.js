import {createSlice} from '@reduxjs/toolkit';
import {
  loginExtraReducer,
  signupExtraReducer,
  logoutExtraReducer,
  updateUserExtraReducer,
  loginAppleExtraReducer,
  signUpAppleExtraReducer,
} from './UserExtraReducers';
import {
  login,
  signUp,
  logout,
  updateUserInfo,
  loginApple,
  signUpApple,
} from './UserThunkAction';
import {USER_TYPE} from '../../Constants';

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
  extraReducers: builder => {
    builder.addCase(
      signUp.pending.type,
      signupExtraReducer[signUp.pending.type],
    );
    builder.addCase(
      signUp.rejected.type,
      signupExtraReducer[signUp.rejected.type],
    );
    builder.addCase(
      signUp.fulfilled.type,
      signupExtraReducer[signUp.fulfilled.type],
    );
    builder.addCase(login.pending.type, loginExtraReducer[login.pending.type]);
    builder.addCase(
      login.rejected.type,
      loginExtraReducer[login.rejected.type],
    );
    builder.addCase(
      login.fulfilled.type,
      loginExtraReducer[login.fulfilled.type],
    );
    builder.addCase(
      loginApple.pending.type,
      loginAppleExtraReducer[loginApple.pending.type],
    );
    builder.addCase(
      loginApple.rejected.type,
      loginAppleExtraReducer[loginApple.rejected.type],
    );
    builder.addCase(
      loginApple.fulfilled.type,
      loginAppleExtraReducer[loginApple.fulfilled.type],
    );
    builder.addCase(
      signUpApple.pending.type,
      signUpAppleExtraReducer[signUpApple.pending.type],
    );
    builder.addCase(
      signUpApple.rejected.type,
      signUpAppleExtraReducer[signUpApple.rejected.type],
    );
    builder.addCase(
      signUpApple.fulfilled.type,
      signUpAppleExtraReducer[signUpApple.fulfilled.type],
    );
    builder.addCase(
      logout.pending.type,
      logoutExtraReducer[logout.pending.type],
    );
    builder.addCase(
      logout.rejected.type,
      logoutExtraReducer[logout.rejected.type],
    );
    builder.addCase(
      logout.fulfilled.type,
      logoutExtraReducer[logout.fulfilled.type],
    );
    builder.addCase(
      updateUserInfo.pending.type,
      updateUserExtraReducer[updateUserInfo.pending.type],
    );
    builder.addCase(
      updateUserInfo.rejected.type,
      updateUserExtraReducer[updateUserInfo.rejected.type],
    );
    builder.addCase(
      updateUserInfo.fulfilled.type,
      updateUserExtraReducer[updateUserInfo.fulfilled.type],
    );
  },
});

const userActions = {
  ...actions,
  signUp,
  login,
  logout,
  updateUserInfo,
  loginApple,
  signUpApple,
};
export {userActions, userReducer};
