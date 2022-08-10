import {createSlice} from '@reduxjs/toolkit';
import {
  onSetChildName,
  onSetAvatar,
  onSetSelectedChild,
  onResetChildInfo,
  onSetIsLoading,
  onAddChildFlowIsEditing,
  onSetCongratulateTaskCompleted,
} from './ChildActionHandler';
import {
  addChildExtraReducer,
  createChildExtraReducer,
  createChildRewardExtraReducer,
  deleteChildTaskExtraReducer,
  getChildTaskExtraReducer,
  updateChildExtraReducer,
  updateChildTaskExtraReducer,
  awardRewardToChildExtraReducer,
  getAllChildrenExtraReducer,
  deleteChildRewardExtraReducer,
  updateChildRewardsExtraReducer,
  completeChildTaskExtraReducer,
  deleteChildExtraReducer,
  completedTaskHistoryReducer,
  getRewardsHistoryReducer,
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
  deleteChildReward,
  updateChildRewards,
  completeChildTask,
  deleteChild,
  getCompletedTaskHistory,
  getRewardsHistory,
} from './ChildThunkAction';

export const initialState = {
  selectedChild: null,
  tasks: [],
  rewards: [],
  childList: [],
  isLoading: false,
  addChildFlowIsEditing: false,
  congratulateTaskCompleted: false,
  completedTaskHistory: [],
};

const {actions, reducer: childReducer} = createSlice({
  name: 'child',
  initialState,
  reducers: {
    setChildName: onSetChildName,
    setAvatar: onSetAvatar,
    setSelectedChild: onSetSelectedChild,
    resetChildInfo: onResetChildInfo,
    setIsLoading: onSetIsLoading,
    setAddChildFlowIsEditig: onAddChildFlowIsEditing,
    setCongratulateTaskCompleted: onSetCongratulateTaskCompleted,
  },
  extraReducers: {
    ...addChildExtraReducer,
    ...updateChildExtraReducer,
    ...createChildExtraReducer,
    ...deleteChildTaskExtraReducer,
    ...updateChildTaskExtraReducer,
    ...getChildTaskExtraReducer,
    ...createChildRewardExtraReducer,
    ...awardRewardToChildExtraReducer,
    ...getAllChildrenExtraReducer,
    ...deleteChildRewardExtraReducer,
    ...updateChildRewardsExtraReducer,
    ...completeChildTaskExtraReducer,
    ...deleteChildExtraReducer,
    ...completedTaskHistoryReducer,
    ...getRewardsHistoryReducer,
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
  deleteChildReward,
  updateChildRewards,
  completeChildTask,
  deleteChild,
  getCompletedTaskHistory,
  getRewardsHistory,
};
export {childActions, childReducer};
