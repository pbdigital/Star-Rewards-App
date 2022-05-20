import {createSlice} from '@reduxjs/toolkit';
import {onSetChildName, onSetAvatar} from './ChildActionHandler';
import {addChild} from './ChildThunkAction';

const initialState = {
  childName: '',
  avatar: null,
  tasks: [],
};

const {actions, reducer: childReducer} = createSlice({
  name: 'child',
  initialState,
  reducers: {
    setChildName: onSetChildName,
    setAvatar: onSetAvatar,
  },
  extraReducers: {
    [addChild.pending.type]: state => {
      console.log('[Add Child: Pending');
    },
    [addChild.rejected.type]: (state, {payload}) => {
      console.log('[Add Child: Rejected', {payload});
      return payload;
    },
    [addChild.fulfilled.type]: (state, {payload}) => {
      console.log('[Add Child: Fulfilled', {payload});
      return payload;
    },
  },
});

const childActions = {...actions, addChild};
export {childActions, childReducer};
