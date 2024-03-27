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
  onResetChildTasks,
  onSetIsCompletingStars,
  onIncrementAdhocBonusTaskCount,
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
  setRewardsGoalReducer,
  removeRewardsGoalReducer,
  createChildSetbackReducer,
  getChildSetbackReducer,
  deleteChildSetbackReducer,
  updateChildSetbackReducer,
  issueChildSetbackReducer,
  adjustChildStarReducer,
  getChildStatsReducer,
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
  setRewardsGoal,
  removeAsRewardGoal,
  // WIP - SPIN ITEM
  createSpinWheelReward,
  updateSpinWheelReward,
  deleteSpinWheelReward,
  getSpinWheelRewards,
  createChildSetback,
  getChildSetback,
  deleteChildSetback,
  updateChildSetback,
  issueChildSetback,
  adjustChildStar,
  getChildStats,
} from './ChildThunkAction';

export const initialState = {
  selectedChild: null,
  selectedChildStats: null,
  isCompletingStars: false,
  tasks: [],
  rewards: [],
  childList: [],
  isLoading: false,
  addChildFlowIsEditing: false,
  congratulateTaskCompleted: false,
  completedTaskHistory: {},
  rewardsHistory: [],
  selectedDateToShowTask: moment(),
  spinnerWheel: {},
  setbacks: [],
  adhocBonusTaskCount: 0,
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
    setResetChildTask: onResetChildTasks,
    setIsCompletingStars: onSetIsCompletingStars,
    incrementAdhocBonusTaskCount: onIncrementAdhocBonusTaskCount,
  },
  extraReducers: builder => {
    builder.addCase(
      addChild.pending.type,
      addChildExtraReducer[addChild.pending.type],
    );
    builder.addCase(
      addChild.rejected.type,
      addChildExtraReducer[addChild.rejected.type],
    );
    builder.addCase(
      addChild.fulfilled.type,
      addChildExtraReducer[addChild.fulfilled.type],
    );
    builder.addCase(
      updateChild.pending.type,
      updateChildExtraReducer[updateChild.pending.type],
    );
    builder.addCase(
      updateChild.rejected.type,
      updateChildExtraReducer[updateChild.rejected.type],
    );
    builder.addCase(
      updateChild.fulfilled.type,
      updateChildExtraReducer[updateChild.fulfilled.type],
    );
    builder.addCase(
      createChildTask.pending.type,
      createChildExtraReducer[createChildTask.pending.type],
    );
    builder.addCase(
      createChildTask.rejected.type,
      createChildExtraReducer[createChildTask.rejected.type],
    );
    builder.addCase(
      createChildTask.fulfilled.type,
      createChildExtraReducer[createChildTask.fulfilled.type],
    );
    builder.addCase(
      deleteChildTask.pending.type,
      deleteChildTaskExtraReducer[deleteChildTask.pending.type],
    );
    builder.addCase(
      deleteChildTask.rejected.type,
      deleteChildTaskExtraReducer[deleteChildTask.rejected.type],
    );
    builder.addCase(
      deleteChildTask.fulfilled.type,
      deleteChildTaskExtraReducer[deleteChildTask.fulfilled.type],
    );
    builder.addCase(
      updateChildTask.pending.type,
      updateChildTaskExtraReducer[updateChildTask.pending.type],
    );
    builder.addCase(
      updateChildTask.rejected.type,
      updateChildTaskExtraReducer[updateChildTask.rejected.type],
    );
    builder.addCase(
      updateChildTask.fulfilled.type,
      updateChildTaskExtraReducer[updateChildTask.fulfilled.type],
    );
    builder.addCase(
      getChildTasks.pending.type,
      getChildTaskExtraReducer[getChildTasks.pending.type],
    );
    builder.addCase(
      getChildTasks.rejected.type,
      getChildTaskExtraReducer[getChildTasks.rejected.type],
    );
    builder.addCase(
      getChildTasks.fulfilled.type,
      getChildTaskExtraReducer[getChildTasks.fulfilled.type],
    );
    builder.addCase(
      createChildReward.pending.type,
      createChildRewardExtraReducer[createChildReward.pending.type],
    );
    builder.addCase(
      createChildReward.rejected.type,
      createChildRewardExtraReducer[createChildReward.rejected.type],
    );
    builder.addCase(
      createChildReward.fulfilled.type,
      createChildRewardExtraReducer[createChildReward.fulfilled.type],
    );
    builder.addCase(
      awardRewardToChild.pending.type,
      awardRewardToChildExtraReducer[awardRewardToChild.pending.type],
    );
    builder.addCase(
      awardRewardToChild.rejected.type,
      awardRewardToChildExtraReducer[awardRewardToChild.rejected.type],
    );
    builder.addCase(
      awardRewardToChild.fulfilled.type,
      awardRewardToChildExtraReducer[awardRewardToChild.fulfilled.type],
    );
    builder.addCase(
      getAllChildren.pending.type,
      getAllChildrenExtraReducer[getAllChildren.pending.type],
    );
    builder.addCase(
      getAllChildren.rejected.type,
      getAllChildrenExtraReducer[getAllChildren.rejected.type],
    );
    builder.addCase(
      getAllChildren.fulfilled.type,
      getAllChildrenExtraReducer[getAllChildren.fulfilled.type],
    );
    builder.addCase(
      deleteChildReward.pending.type,
      deleteChildRewardExtraReducer[deleteChildReward.pending.type],
    );
    builder.addCase(
      deleteChildReward.rejected.type,
      deleteChildRewardExtraReducer[deleteChildReward.rejected.type],
    );
    builder.addCase(
      deleteChildReward.fulfilled.type,
      deleteChildRewardExtraReducer[deleteChildReward.fulfilled.type],
    );
    builder.addCase(
      updateChildRewards.pending.type,
      updateChildRewardsExtraReducer[updateChildRewards.pending.type],
    );
    builder.addCase(
      updateChildRewards.rejected.type,
      updateChildRewardsExtraReducer[updateChildRewards.rejected.type],
    );
    builder.addCase(
      updateChildRewards.fulfilled.type,
      updateChildRewardsExtraReducer[updateChildRewards.fulfilled.type],
    );
    builder.addCase(
      completeChildTask.pending.type,
      completeChildTaskExtraReducer[completeChildTask.pending.type],
    );
    builder.addCase(
      completeChildTask.rejected.type,
      completeChildTaskExtraReducer[completeChildTask.rejected.type],
    );
    builder.addCase(
      completeChildTask.fulfilled.type,
      completeChildTaskExtraReducer[completeChildTask.fulfilled.type],
    );
    builder.addCase(
      deleteChild.pending.type,
      deleteChildExtraReducer[deleteChild.pending.type],
    );
    builder.addCase(
      deleteChild.rejected.type,
      deleteChildExtraReducer[deleteChild.rejected.type],
    );
    builder.addCase(
      deleteChild.fulfilled.type,
      deleteChildExtraReducer[deleteChild.fulfilled.type],
    );
    builder.addCase(
      getCompletedTaskHistory.pending.type,
      completedTaskHistoryReducer[getCompletedTaskHistory.pending.type],
    );
    builder.addCase(
      getCompletedTaskHistory.rejected.type,
      completedTaskHistoryReducer[getCompletedTaskHistory.rejected.type],
    );
    builder.addCase(
      getCompletedTaskHistory.fulfilled.type,
      completedTaskHistoryReducer[getCompletedTaskHistory.fulfilled.type],
    );
    builder.addCase(
      deleteCompletedTaskHistory.pending.type,
      deleteCompletedTaskHistoryReducer[
        deleteCompletedTaskHistory.pending.type
      ],
    );
    builder.addCase(
      deleteCompletedTaskHistory.rejected.type,
      deleteCompletedTaskHistoryReducer[
        deleteCompletedTaskHistory.rejected.type
      ],
    );
    builder.addCase(
      deleteCompletedTaskHistory.fulfilled.type,
      deleteCompletedTaskHistoryReducer[
        deleteCompletedTaskHistory.fulfilled.type
      ],
    );
    builder.addCase(
      getRewardsHistory.pending.type,
      rewardsHistoryReducer[getRewardsHistory.pending.type],
    );
    builder.addCase(
      getRewardsHistory.rejected.type,
      rewardsHistoryReducer[getRewardsHistory.rejected.type],
    );
    builder.addCase(
      getRewardsHistory.fulfilled.type,
      rewardsHistoryReducer[getRewardsHistory.fulfilled.type],
    );
    builder.addCase(
      deleteRewardsHistory.pending.type,
      deleteRewardsHistoryReducer[deleteRewardsHistory.pending.type],
    );
    builder.addCase(
      deleteRewardsHistory.rejected.type,
      deleteRewardsHistoryReducer[deleteRewardsHistory.rejected.type],
    );
    builder.addCase(
      deleteRewardsHistory.fulfilled.type,
      deleteRewardsHistoryReducer[deleteRewardsHistory.fulfilled.type],
    );
    builder.addCase(
      setRewardsGoal.pending.type,
      setRewardsGoalReducer[setRewardsGoal.pending.type],
    );
    builder.addCase(
      setRewardsGoal.rejected.type,
      setRewardsGoalReducer[setRewardsGoal.rejected.type],
    );
    builder.addCase(
      setRewardsGoal.fulfilled.type,
      setRewardsGoalReducer[setRewardsGoal.fulfilled.type],
    );
    builder.addCase(
      removeAsRewardGoal.pending.type,
      removeRewardsGoalReducer[removeAsRewardGoal.pending.type],
    );
    builder.addCase(
      removeAsRewardGoal.rejected.type,
      removeRewardsGoalReducer[removeAsRewardGoal.rejected.type],
    );
    builder.addCase(
      removeAsRewardGoal.fulfilled.type,
      removeRewardsGoalReducer[removeAsRewardGoal.fulfilled.type],
    );
    builder.addCase(
      createChildSetback.pending.type,
      createChildSetbackReducer[createChildSetback.pending.type],
    );
    builder.addCase(
      createChildSetback.rejected.type,
      createChildSetbackReducer[createChildSetback.rejected.type],
    );
    builder.addCase(
      createChildSetback.fulfilled.type,
      createChildSetbackReducer[createChildSetback.fulfilled.type],
    );
    builder.addCase(
      getChildSetback.pending.type,
      getChildSetbackReducer[getChildSetback.pending.type],
    );
    builder.addCase(
      getChildSetback.rejected.type,
      getChildSetbackReducer[getChildSetback.rejected.type],
    );
    builder.addCase(
      getChildSetback.fulfilled.type,
      getChildSetbackReducer[getChildSetback.fulfilled.type],
    );
    builder.addCase(
      deleteChildSetback.pending.type,
      deleteChildSetbackReducer[deleteChildSetback.pending.type],
    );
    builder.addCase(
      deleteChildSetback.rejected.type,
      deleteChildSetbackReducer[deleteChildSetback.rejected.type],
    );
    builder.addCase(
      deleteChildSetback.fulfilled.type,
      deleteChildSetbackReducer[deleteChildSetback.fulfilled.type],
    );
    builder.addCase(
      updateChildSetback.pending.type,
      updateChildSetbackReducer[updateChildSetback.pending.type],
    );
    builder.addCase(
      updateChildSetback.rejected.type,
      updateChildSetbackReducer[updateChildSetback.rejected.type],
    );
    builder.addCase(
      updateChildSetback.fulfilled.type,
      updateChildSetbackReducer[updateChildSetback.fulfilled.type],
    );
    builder.addCase(
      issueChildSetback.pending.type,
      issueChildSetbackReducer[issueChildSetback.pending.type],
    );
    builder.addCase(
      issueChildSetback.rejected.type,
      issueChildSetbackReducer[issueChildSetback.rejected.type],
    );
    builder.addCase(
      issueChildSetback.fulfilled.type,
      issueChildSetbackReducer[issueChildSetback.fulfilled.type],
    );
    builder.addCase(
      adjustChildStar.pending.type,
      adjustChildStarReducer[adjustChildStar.pending.type],
    );
    builder.addCase(
      adjustChildStar.rejected.type,
      adjustChildStarReducer[adjustChildStar.rejected.type],
    );
    builder.addCase(
      adjustChildStar.fulfilled.type,
      adjustChildStarReducer[adjustChildStar.fulfilled.type],
    );
    builder.addCase(
      getChildStats.pending.type,
      getChildStatsReducer[getChildStats.pending.type],
    );
    builder.addCase(
      getChildStats.rejected.type,
      getChildStatsReducer[getChildStats.rejected.type],
    );
    builder.addCase(
      getChildStats.fulfilled.type,
      getChildStatsReducer[getChildStats.fulfilled.type],
    );
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
  createSpinWheelReward,
  updateSpinWheelReward,
  deleteSpinWheelReward,
  getSpinWheelRewards,
  setRewardsGoal,
  removeAsRewardGoal,
  createChildSetback,
  getChildSetback,
  deleteChildSetback,
  updateChildSetback,
  issueChildSetback,
  adjustChildStar,
  getChildStats,
};
export {childActions, childReducer};
