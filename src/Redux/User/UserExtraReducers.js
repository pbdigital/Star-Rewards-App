import {login, signUp, logout, updateUserInfo} from './UserThunkAction';

export const signupExtraReducer = {
  [signUp.pending.type]: state => {
    console.log('[Sign Up]: Pending');
  },
  [signUp.rejected.type]: state => {
    console.log('[Sign Up]: Rejected');
  },
  [signUp.fulfilled.type]: (state, {payload}) => {
    console.log('[Sign Up]: fulfilled', payload);
    state.info = payload;
  },
};

export const loginExtraReducer = {
  [login.pending.type]: state => {
    console.log('[login]: Pending');
  },
  [login.rejected.type]: state => {
    console.log('[login]: Rejected');
  },
  [login.fulfilled.type]: (state, {payload}) => {
    console.log('[login]: fulfilled', payload);
    state.info = payload;
  },
};

export const logoutExtraReducer = {
  [logout.pending.type]: state => {
    console.log('[logout]: Pending');
  },
  [logout.rejected.type]: (state, payload) => {
    console.log('[logout]: Rejected', {state, payload});
  },
  [logout.fulfilled.type]: (state, {payload}) => {
    console.log('[logout]: fulfilled', payload);
    state.info = null;
    state.isReadOnly = false;
  },
};

export const updateUserExtraReducer = {
  [updateUserInfo.pending.type]: state => {
    console.log('[updateUserInfo]: Pending');
  },
  [updateUserInfo.rejected.type]: (state, payload) => {
    console.log('[updateUserInfo]: Rejected', {state, payload});
  },
  [updateUserInfo.fulfilled.type]: (state, {payload}) => {
    console.log('[updateUserInfo]: fulfilled', payload);
    if (payload.success) {
      state.info = {...state.info, ...payload.userInfo};
    }
  },
};
