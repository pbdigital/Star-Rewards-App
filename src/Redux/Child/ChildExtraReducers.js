import {
  addChild,
  createChildReward,
  createChildTask,
  deleteChildTask,
  getChildRewards,
  getChildTasks,
  updateChild,
  updateChildTask,
} from './ChildThunkAction';

export const addChildExtraReducer = {
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
};

export const updateChildExtraReducer = {
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
};

export const createChildExtraReducer = {
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
};

export const getChildExtraReducer = {
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
};

export const deleteChildTaskExtraReducer = {
  [deleteChildTask.pending.type]: state => {
    console.log('[Delete Child Tasks]: Pending');
  },
  [deleteChildTask.rejected.type]: (state, {payload}) => {
    console.log('[Delete Child Tasks]: Rejected', {payload});
  },
  [deleteChildTask.fulfilled.type]: (state, {payload}) => {
    console.log('[Delete Child Tasks]: Fulfilled', {payload});
  },
};

export const updateChildTaskExtraReducer = {
  [updateChildTask.pending.type]: state => {
    console.log('[Update Child Tasks]: Pending');
  },
  [updateChildTask.rejected.type]: (state, {payload}) => {
    console.log('[Update Child Tasks]: Rejected', {payload});
  },
  [updateChildTask.fulfilled.type]: (state, {payload}) => {
    console.log('[Update Child Tasks]: Fulfilled', {payload});
  },
};

export const getChildRewardExtraReducer = {
  [getChildRewards.pending.type]: state => {
    console.log('[Get Child Rewards]: Pending');
  },
  [getChildRewards.rejected.type]: (state, {payload}) => {
    console.log('[Get Child Rewards]: Rejected', {payload});
  },
  [getChildRewards.fulfilled.type]: (state, {payload}) => {
    console.log('[Get Child Rewards]: Fulfilled', {payload});
    const {rewards} = payload;
    state.rewards = rewards || [];
  },
};

export const createChildRewardExtraReducer = {
  [createChildReward.pending.type]: state => {
    console.log('[Get Child Rewards]: Pending');
  },
  [createChildReward.rejected.type]: (state, {payload}) => {
    console.log('[Get Child Rewards]: Rejected', {payload});
  },
  [createChildReward.fulfilled.type]: (state, {payload}) => {
    console.log('[Get Child Rewards]: Fulfilled', {payload});
    const {rewards} = payload;
    state.rewards = rewards || [];
  },
};
