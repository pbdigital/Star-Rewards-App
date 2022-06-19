import {createSlice} from '@reduxjs/toolkit';
import {
  onSetChildName,
  onSetAvatar,
  onSetSelectedChild,
  onResetChildInfo,
  onSetIsLoading,
  onAddChildFlowIsEditing,
} from './ChildActionHandler';
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
  deleteChildRewardExtraReducer,
  updateChildRewardsExtraReducer,
  completeChildTaskExtraReducer,
  deleteChildExtraReducer,
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
} from './ChildThunkAction';

export const initialState = {
  selectedChild: null,
  tasks: [],
  rewards: [],
  childList: [],
  isLoading: false,
  addChildFlowIsEditing: false,
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
    ...deleteChildRewardExtraReducer,
    ...updateChildRewardsExtraReducer,
    ...completeChildTaskExtraReducer,
    ...deleteChildExtraReducer,
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
};
export {childActions, childReducer};
