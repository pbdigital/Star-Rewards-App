import {createSlice} from '@reduxjs/toolkit';
import {onSetChildName, onSetAvatar} from './ChildActionHandler';
import {
  addChild,
  createChildTask,
  deleteChildTask,
  getChildTasks,
  updateChild,
  updateChildTask,
} from './ChildThunkAction';

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
    [updateChild.pending.type]: state => {
      console.log('[Update Child: Pending');
    },
    [updateChild.rejected.type]: (state, {payload}) => {
      console.log('[Update Child: Rejected', {payload});
    },
    [updateChild.fulfilled.type]: (state, {payload, meta}) => {
      console.log('[UpdateChild: Fulfilled', {meta, payload});
      const {avatarId, name, childId} = meta?.arg || {};
      state.avatar = {
        ...state.avatar,
        avatarId,
      };
      state.childName = name;
      state.childId = childId;
    },
    [createChildTask.pending.type]: state => {
      console.log('[Create Child Task]: Pending');
    },
    [createChildTask.rejected.type]: (state, {payload}) => {
      console.log('[Create Child Task]: Rejected', {payload});
    },
    [createChildTask.fulfilled.type]: (state, {payload}) => {
      console.log('[Create Child Task]: Fulfilled', {payload});
      state.tasks = payload.tasks;
    },
    [getChildTasks.pending.type]: state => {
      console.log('[Get Child Tasks]: Pending');
    },
    [getChildTasks.rejected.type]: (state, {payload}) => {
      console.log('[Get Child Tasks]: Rejected', {payload});
    },
    [getChildTasks.fulfilled.type]: (state, {payload}) => {
      const {tasks, bonusTasks} = payload;
      if (tasks && bonusTasks) {
        state.tasks = [...tasks, ...bonusTasks];
      }
    },
    [deleteChildTask.pending.type]: state => {
      console.log('[Delete Child Tasks]: Pending');
    },
    [deleteChildTask.rejected.type]: (state, {payload}) => {
      console.log('[Delete Child Tasks]: Rejected', {payload});
    },
    [deleteChildTask.fulfilled.type]: (state, {payload}) => {
      console.log('[Delete Child Tasks]: Fulfilled', {payload});
    },
    [updateChildTask.pending.type]: state => {
      console.log('[Update Child Tasks]: Pending');
    },
    [updateChildTask.rejected.type]: (state, {payload}) => {
      console.log('[Update Child Tasks]: Rejected', {payload});
    },
    [updateChildTask.fulfilled.type]: (state, {payload}) => {
      console.log('[Update Child Tasks]: Fulfilled', {payload});
    },
  },
});

const childActions = {
  ...actions,
  addChild,
  updateChild,
  createChildTask,
  getChildTasks,
  deleteChildTask,
  updateChildTask,
};
export {childActions, childReducer};
