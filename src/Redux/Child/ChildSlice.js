import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import {
  onSetChildName,
  onSetAvatar,
  onSetSelectedChild,
  onResetChildInfo,
  onSetIsLoading,
  onAddChildFlowIsEditing,
  onSetCongratulateTaskCompleted,
  onResetHistoryData,
  onResetRewardsList,
  onSetSelectedDateToShowTask,
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
  deleteCompletedTaskHistoryReducer,
  rewardsHistoryReducer,
  deleteRewardsHistoryReducer,
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
  deleteCompletedTaskHistory,
  getRewardsHistory,
  deleteRewardsHistory,
} from './ChildThunkAction';

export const initialState = {
  selectedChild: null,
  tasks: [],
  rewards: [],
  childList: [],
  isLoading: false,
  addChildFlowIsEditing: false,
  congratulateTaskCompleted: false,
  completedTaskHistory: {},
  rewardsHistory: [],
  selectedDateToShowTask: moment(),
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
    resetHistoryData: onResetHistoryData,
    resetRewardsList: onResetRewardsList,
    setSelectedDateToShowTask: onSetSelectedDateToShowTask,
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
    ...deleteCompletedTaskHistoryReducer,
    ...rewardsHistoryReducer,
    ...deleteRewardsHistoryReducer,
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
  deleteCompletedTaskHistory,
  getRewardsHistory,
  deleteRewardsHistory,
};
export {childActions, childReducer};
