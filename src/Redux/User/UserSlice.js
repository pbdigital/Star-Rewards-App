import {createSlice} from '@reduxjs/toolkit';
import {API} from '../../Services/api';
import {signUp} from './UserThunkAction';

const initialState = {
  info: null,
};

const {actions, reducer: userReducer} = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [signUp.pending.type]: state => {
      console.log('[Sign Up]: Pending');
    },
    [signUp.rejected.type]: state => {
      console.log('[Sign Up]: Rejected');
    },
    [signUp.fulfilled.type]: (state, {payload}) => {
      console.log('[Sign Up]: fulfilled', payload);
      if (payload?.token) {
        API.setHeader('Authorization', `Bearer ${payload?.token}`);
      }

      state.info = payload;
    },
  },
});

const userActions = {...actions, signUp};
export {userActions, userReducer};
