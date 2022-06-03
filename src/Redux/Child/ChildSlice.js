import {createSlice} from '@reduxjs/toolkit';
import {onSetChildName, onSetAvatar} from './ChildActionHandler';
import {
  addChildExtraReducer,
  createChildExtraReducer,
  createChildRewardExtraReducer,
  deleteChildTaskExtraReducer,
  getChildExtraReducer,
  updateChildExtraReducer,
  updateChildTaskExtraReducer,
  awardRewardToChildExtraReducer,
  getAllChildrenExtraReducer,
} from './ChildExtraReducers';
import {
  addChild,
  createChildReward,
  createChildTask,
  deleteChildTask,
  getChildRewards,
  getChildTasks,
  updateChild,
  updateChildTask,
  awardRewardToChild,
  getAllChildren,
} from './ChildThunkAction';

const initialState = {
  childName: '',
  avatar: null,
  childId: null,
  stars: 5, // For debug
  tasks: [],
  rewards: [],
  children: [],
};

const {actions, reducer: childReducer} = createSlice({
  name: 'child',
  initialState,
  reducers: {
    setChildName: onSetChildName,
    setAvatar: onSetAvatar,
  },
  extraReducers: {
    ...addChildExtraReducer,
    ...updateChildExtraReducer,
    ...createChildExtraReducer,
    ...getChildExtraReducer,
    ...deleteChildTaskExtraReducer,
    ...updateChildTaskExtraReducer,
    ...getChildExtraReducer,
    ...createChildRewardExtraReducer,
    ...awardRewardToChildExtraReducer,
    ...getAllChildrenExtraReducer,
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
  getChildRewards,
  createChildReward,
  awardRewardToChild,
  getAllChildren,
};
export {childActions, childReducer};
