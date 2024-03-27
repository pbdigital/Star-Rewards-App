import {initialState} from './ChildSlice';

export const onSetChildName = (state, action) => {
  state.childName = action.payload;
};

export const onSetAvatar = (state, action) => {
  state.avatar = action.payload;
};

export const onSetSelectedChild = (state, action) => {
  state.selectedChild = action.payload;
  state.selectedChildStats = initialState.selectedChildStats;
};

export const onResetChildInfo = state => {
  state.selectedChild = initialState.selectedChild;
  state.tasks = initialState.tasks;
  state.rewards = initialState.rewards;
  state.childList = initialState.childList;
  state.isLoading = initialState.isLoading;
  state.selectedChildStats = initialState.selectedChildStats;
};

export const onSetIsLoading = (state, action) => {
  state.isLoading = action.payload;
};

export const onAddChildFlowIsEditing = (state, action) => {
  state.addChildFlowIsEditing = action.payload;
};

export const onSetCongratulateTaskCompleted = (state, action) => {
  state.congratulateTaskCompleted = action.payload;
};

export const onResetHistoryData = state => {
  state.completedTaskHistory = {};
  state.rewardsHistory = [];
};

export const onResetRewardsList = state => {
  state.rewards = [];
};

export const onSetSelectedDateToShowTask = (state, action) => {
  state.selectedDateToShowTask = action.payload;
};

export const onResetChildTasks = state => {
  state.tasks = [];
};

export const onSetIsCompletingStars = (state, action) => {
  state.isCompletingStars = action.payload;
};

export const onIncrementAdhocBonusTaskCount = (state, action) => {
  state.adhocBonusTaskCount += 1;
};
