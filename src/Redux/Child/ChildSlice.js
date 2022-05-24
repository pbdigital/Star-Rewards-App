import {createSlice} from '@reduxjs/toolkit';
import {onSetChildName, onSetAvatar} from './ChildActionHandler';
import {addChild, createChildTask, getChildTasks} from './ChildThunkAction';

const initialState = {
  childName: '',
  avatar: null,
  childId: null,
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
    },
    [addChild.fulfilled.type]: (state, {payload}) => {
      console.log('[Add Child: Fulfilled', {payload});
      state.childId = payload?.childId;
    },
    [createChildTask.pending.type]: state => {
      console.log('[Add Child Task]: Pending');
    },
    [createChildTask.rejected.type]: (state, {payload}) => {
      console.log('[Add Child Task]: Rejected', {payload});
    },
    [createChildTask.fulfilled.type]: (state, {payload}) => {
      console.log('[Add Child Task]: Fulfilled', {payload});
      state.tasks = payload.tasks;
    },
    [getChildTasks.pending.type]: state => {
      console.log('[Get Child Tasks]: Pending');
    },
    [getChildTasks.rejected.type]: (state, {payload}) => {
      console.log('[Get Child Tasks]: Rejected', {payload});
    },
    [getChildTasks.fulfilled.type]: (state, {payload}) => {
      console.log('[Get Child Tasks]: Fulfilled', {payload});
      state.tasks = payload.tasks;
    },
  },
});

const childActions = {...actions, addChild, createChildTask, getChildTasks};
export {childActions, childReducer};
