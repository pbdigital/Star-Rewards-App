import {
  addChild,
  awardRewardToChild,
  createChildReward,
  createChildTask,
  deleteChildReward,
  deleteChildTask,
  getAllChildren,
  getChildRewards,
  getChildTasks,
  updateChild,
  updateChildTask,
  updateChildRewards,
  completeChildTask,
  deleteChild,
  getCompletedTaskHistory,
  getRewardsHistory,
  deleteCompletedTaskHistory,
  deleteRewardsHistory,
  setRewardsGoal,
  removeAsRewardGoal,
  createChildSetback,
  getChildSetback,
  deleteChildSetback,
  updateChildSetback,
  issueChildSetback,
  adjustChildStar,
  copyChildTask,
} from './ChildThunkAction';

export const getAllChildrenExtraReducer = {
  [getAllChildren.pending.type]: state => {
    console.log('[Get all children] Pending');
  },
  [getAllChildren.rejected.type]: (state, {payload}) => {
    console.log('[Get all children] Rejected', {payload});
  },
  [getAllChildren.fulfilled.type]: (state, {payload}) => {
    console.log('[Get all children] Fulfilled', {payload});
    const {children} = payload || {};
    const newChildList = children || [];
    state.childList = newChildList;

    const childId = state.selectedChild?.id;
    const hasChildren = children?.length > 0;
    if (childId && hasChildren) {
      const selectedChild = children.filter(child => child.id === childId);

      if (selectedChild.length > 0) {
        state.selectedChild = selectedChild[0];
      } else {
        state.selectedChild = newChildList[0];
      }
    } else if (hasChildren) {
      state.selectedChild = newChildList[0];
    }
  },
};

export const addChildExtraReducer = {
  [addChild.pending.type]: state => {
    console.log('[Add Child: Pending');
  },
  [addChild.rejected.type]: (state, {payload}) => {
    console.log('[Add Child: Rejected', {payload});
  },
  [addChild.fulfilled.type]: (state, {payload}) => {
    console.log('[Add Child: Fulfilled', {payload});
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
    // eslint-disable-next-line no-unused-vars
    const {avatarId, name, childId} = meta?.arg || {};
    state.avatar = {
      ...state.avatar,
      avatarId,
    };
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

export const getChildTaskExtraReducer = {
  [getChildTasks.pending.type]: state => {
    console.log('[Get Child Tasks]: Pending');
  },
  [getChildTasks.rejected.type]: (state, {payload}) => {
    console.log('[Get Child Tasks]: Rejected', {payload});
  },
  [getChildTasks.fulfilled.type]: (state, {payload}) => {
    const {tasks, bonusTasks} = payload;
    const childTasks = tasks || [];
    const childBonusTasks = bonusTasks || [];
    state.tasks = [...childTasks, ...childBonusTasks];
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
    state.isLoading = true;
  },
  [createChildReward.rejected.type]: (state, {payload}) => {
    console.log('[Get Child Rewards]: Rejected', {payload});
    state.isLoading = false;
  },
  [createChildReward.fulfilled.type]: (state, {payload}) => {
    console.log('[Get Child Rewards]: Fulfilled', {payload});
    const {rewards} = payload;
    state.rewards = rewards || [];
    state.isLoading = false;
  },
};

export const awardRewardToChildExtraReducer = {
  [awardRewardToChild.pending.type]: state => {
    console.log('[Award Reward To Child]: Pending');
  },
  [awardRewardToChild.rejected.type]: (state, {payload}) => {
    console.log('[Award Reward To Child]: Rejected', {payload});
  },
  [awardRewardToChild.fulfilled.type]: (state, {payload}) => {
    console.log('[Award Reward To Child]: Fulfilled', {payload});
    if (payload?.success) {
      state.selectedChild = {
        ...state.selectedChild,
        stars: payload?.stars || state.stars,
      };
    }
  },
};

export const deleteChildRewardExtraReducer = {
  [deleteChildReward.pending.type]: state => {
    console.log('[Delete Child Reward]: Pending');
    state.isLoading = true;
  },
  [deleteChildReward.rejected.type]: (state, {payload}) => {
    console.log('[Delete Child Reward]: Rejected', {payload});
    state.isLoading = false;
  },
  [deleteChildReward.fulfilled.type]: (state, {payload}) => {
    console.log('[Delete Child Reward]: Fulfilled', {payload});
    const {rewards} = payload || {};
    if (rewards) {
      state.rewards = rewards;
    }
    state.isLoading = false;
  },
};

export const updateChildRewardsExtraReducer = {
  [updateChildRewards.pending.type]: state => {
    console.log('[Update Child Reward]: Pending');
    state.isLoading = true;
  },
  [updateChildRewards.rejected.type]: (state, {payload}) => {
    console.log('[Update Child Reward]: Rejected', {payload});
    state.isLoading = false;
  },
  [updateChildRewards.fulfilled.type]: (state, {payload}) => {
    console.log('[Update Child Reward]: Fulfilled', {payload});
    const {rewards} = payload || {};
    if (rewards) {
      state.rewards = rewards;
    }
    state.isLoading = false;
  },
};

export const completeChildTaskExtraReducer = {
  [completeChildTask.pending.type]: state => {
    console.log('[Complete Child Task]: Pending');
  },
  [completeChildTask.rejected.type]: (state, {payload}) => {
    console.log('[Complete Child Task]: Rejected', {payload});
  },
  [completeChildTask.fulfilled.type]: (state, {payload}) => {
    console.log('[Complete Child Task]: Fulfilled', {payload});
  },
};

export const deleteChildExtraReducer = {
  [deleteChild.pending.type]: state => {
    console.log('[Delete Child]: Pending');
  },
  [deleteChild.rejected.type]: (state, {payload}) => {
    console.log('[Delete Child]: Rejected', {payload});
  },
  [deleteChild.fulfilled.type]: (state, {payload}) => {
    console.log('[Delete Child]: Fulfilled', {payload});
    const {success, children} = payload;
    if (success) {
      state.childList = children || [];
      if (children?.length > 0) {
        state.selectedChild = children[0];
      } else {
        state.selectedChild = null;
        state.tasks = [];
        state.rewards = [];
      }
    }
  },
};

export const completedTaskHistoryReducer = {
  [getCompletedTaskHistory.pending.type]: state => {
    console.log('[Completed Task History]: Pending');
  },
  [getCompletedTaskHistory.rejected.type]: (state, {payload}) => {
    console.log('[Completed Task History]: Rejected', {payload});
  },
  [getCompletedTaskHistory.fulfilled.type]: (state, {payload}) => {
    console.log('[Completed Task History]: Fulfilled', {payload});
    const {success, tasks} = payload;
    if (success) {
      state.completedTaskHistory = tasks || {};
    }
  },
};

export const deleteCompletedTaskHistoryReducer = {
  [deleteCompletedTaskHistory.pending.type]: state => {
    console.log('[Delete Task History]: Pending');
  },
  [deleteCompletedTaskHistory.rejected.type]: (state, {payload}) => {
    console.log('[Delete Task History]: Rejected', {payload});
  },
  [deleteCompletedTaskHistory.fulfilled.type]: (state, {payload}) => {
    console.log('[Delete Task History]: Fulfilled', {payload});
    const {success, stars} = payload;
    if (success) {
      state.selectedChild = {
        ...state.selectedChild,
        stars,
      };
    }
  },
};

export const rewardsHistoryReducer = {
  [getRewardsHistory.pending.type]: state => {
    console.log('[Rewards History]: Pending');
  },
  [getRewardsHistory.rejected.type]: (state, {payload}) => {
    console.log('[Rewards History]: Rejected', {payload});
  },
  [getRewardsHistory.fulfilled.type]: (state, {payload}) => {
    console.log('[Rewards History]: Fulfilled', {payload});
    const {success, rewards} = payload;
    if (success) {
      const rewardsHistory = rewards || {};
      const keys = Object.keys(rewardsHistory);
      keys.map(date => {
        const temp = rewardsHistory[date];
        const rewardHistoryEntries = temp.map(entry => ({
          ...entry,
          date,
        }));
        rewardsHistory[date] = rewardHistoryEntries;
      });
      state.rewardsHistory = rewardsHistory;
    }
  },
};

export const deleteRewardsHistoryReducer = {
  [deleteRewardsHistory.pending.type]: state => {
    console.log('[Delete Rewards History]: Pending');
  },
  [deleteRewardsHistory.rejected.type]: (state, {payload}) => {
    console.log('[Delete Rewards History]: Rejected', {payload});
  },
  [deleteRewardsHistory.fulfilled.type]: (state, {payload}) => {
    console.log('[Delete Rewards History]: Fulfilled', {payload});
    const {success, stars} = payload;
    if (success) {
      state.selectedChild = {
        ...state.selectedChild,
        stars,
      };
    }
  },
};

export const setRewardsGoalReducer = {
  [setRewardsGoal.pending.type]: state => {
    console.log('[Set Rewards Goal]: Pending');
  },
  [setRewardsGoal.rejected.type]: (state, {payload}) => {
    console.log('[Set Rewards Goal]: Rejected', {payload});
  },
  [setRewardsGoal.fulfilled.type]: (state, {payload}) => {
    console.log('[Set Rewards Goal]: Fulfilled', {payload});
    const {success, rewards} = payload;
    if (success) {
      state.rewards = rewards;
    }
  },
};

export const removeRewardsGoalReducer = {
  [removeAsRewardGoal.pending.type]: state => {
    console.log('[Remove Rewards Goal]: Pending');
  },
  [removeAsRewardGoal.rejected.type]: (state, {payload, ...rest}) => {
    console.log('[Remove Rewards Goal]: Rejected', {payload, rest});
  },
  [removeAsRewardGoal.fulfilled.type]: (state, {payload}) => {
    console.log('[Remove Rewards Goal]: Fulfilled', {payload});
    const {success, rewards} = payload;
    if (success) {
      state.rewards = rewards;
    }
  },
};

export const createChildSetbackReducer = {
  [createChildSetback.pending.type]: state => {
    console.log('[Create Child Setback]: Pending');
  },
  [createChildSetback.rejected.type]: (state, {payload, ...rest}) => {
    console.log('[Create Child Setback]: Rejected', {payload, rest});
  },
  [createChildSetback.fulfilled.type]: (state, {payload}) => {
    console.log('[Create Child Setback]: Fulfilled', {payload});
    const {success, setbacks} = payload;
    console.log('[Create Child Setback]: wwww', {setbacks});
    if (success) {
      state.setbacks = setbacks;
    }
  },
};

export const getChildSetbackReducer = {
  [getChildSetback.pending.type]: state => {
    console.log('[Get Child Setback]: Pending');
  },
  [getChildSetback.rejected.type]: (state, {payload, ...rest}) => {
    console.log('[Get Child Setback]: Rejected', {payload, rest});
  },
  [getChildSetback.fulfilled.type]: (state, {payload}) => {
    console.log('[Get Child Setback]: Fulfilled', {payload});
    const {success, setbacks} = payload;
    console.log('[Get Child Setback]: wewewe', {setbacks});
    if (success) {
      state.setbacks = setbacks;
    }
  },
};

export const deleteChildSetbackReducer = {
  [deleteChildSetback.pending.type]: state => {
    console.log('[Delete Child Setback]: Pending');
  },
  [deleteChildSetback.rejected.type]: (state, {payload, ...rest}) => {
    console.log('[Delete Child Setback]: Rejected', {payload, rest});
  },
  [deleteChildSetback.fulfilled.type]: (state, {payload}) => {
    console.log('[Delete Child Setback]: Fulfilled', {payload});
    const {success, setbacks} = payload;
    if (success) {
      state.setbacks = setbacks;
    }
  },
};

export const updateChildSetbackReducer = {
  [updateChildSetback.pending.type]: state => {
    console.log('[Update Child Setback]: Pending');
  },
  [updateChildSetback.rejected.type]: (state, {payload, ...rest}) => {
    console.log('[Update Child Setback]: Rejected', {payload, rest});
  },
  [updateChildSetback.fulfilled.type]: (state, {payload}) => {
    console.log('[Update Child Setback]: Fulfilled', {payload});
    const {success, setbacks} = payload;
    console.log('[Update Child Setback]: Fulfilled www', {setbacks, success});
    if (success) {
      state.setbacks = setbacks;
    }
  },
};

export const issueChildSetbackReducer = {
  [issueChildSetback.pending.type]: state => {
    console.log('[Issue Child Setback]: Pending');
  },
  [issueChildSetback.rejected.type]: (state, {payload, ...rest}) => {
    console.log('[Issue Child Setback]: Rejected', {payload, rest});
  },
  [issueChildSetback.fulfilled.type]: (state, {payload}) => {
    console.log('[Issue Child Setback]: Fulfilled', {payload});
    const {success, stars} = payload;
    if (success) {
      state.selectedChild = {
        ...state.selectedChild,
        stars,
      };
    }
  },
};

export const adjustChildStarReducer = {
  [adjustChildStar.pending.type]: state => {
    console.log('[Adjust Child Star]: Pending');
  },
  [adjustChildStar.rejected.type]: (state, {payload, ...rest}) => {
    console.log('[Adjust Child Star]: Rejected', {payload, rest});
  },
  [adjustChildStar.fulfilled.type]: (state, {payload}) => {
    console.log('[Adjust Child Star]: Fulfilled', {payload});
    const {success, stars} = payload;
    if (success) {
      state.selectedChild = {
        ...state.selectedChild,
        stars,
      };
    }
  },
};

export const copyChildReducer = {
  [copyChildTask.pending.type]: state => {
    console.log('[Copy Child Star]: Pending');
  },
  [copyChildTask.rejected.type]: (state, {payload, ...rest}) => {
    console.log('[Copy Child Star]: Rejected', {payload, rest});
  },
  [copyChildTask.fulfilled.type]: (state, {payload}) => {
    console.log('[Copy Child Star]: Fulfilled', {payload});
    const {success, tasks} = payload;
    if (success) {
      state.tasks = tasks;
    }
  },
};
