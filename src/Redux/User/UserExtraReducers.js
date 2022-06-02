import {login, signUp} from './UserThunkAction';

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
