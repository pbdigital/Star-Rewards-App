import {createAsyncThunk} from '@reduxjs/toolkit';
import _ from 'lodash';
import {ChildService} from 'Services/ChildService';
import {childActions} from './ChildSlice';
import {SetbackService} from '../../Services';

const setSelectedChildViaChildIdFromTheList = async (childId, dispatch) => {
  const {payload} = await dispatch(childActions.getAllChildren());
  const children = payload?.children || [];
  const selectedChild = children.filter(child => child.id === childId);
  if (selectedChild.length > 0) {
    await dispatch(childActions.setSelectedChild(selectedChild[0]));
  }
};

export const getAllChildren = createAsyncThunk('get_all_children', async () => {
  try {
    const response = await ChildService.getAllChildren();
    return response.data;
  } catch (err) {
    return {err};
  }
});

export const addChild = createAsyncThunk(
  'add_child',
  async ({name, avatarId}, {dispatch}) => {
    try {
      const resAddChild = await ChildService.addChild({
        name,
        avatarId,
      });
      const {childId} = resAddChild?.data;
      await setSelectedChildViaChildIdFromTheList(childId, dispatch);
      return resAddChild.data;
    } catch (err) {
      return {err};
    }
  },
);

export const updateChild = createAsyncThunk(
  'update_child',
  async ({childId, name, avatarId}, {dispatch}) => {
    try {
      const response = await ChildService.updateChild({
        childId,
        name,
        avatarId,
      });
      await setSelectedChildViaChildIdFromTheList(childId, dispatch);

      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const createChildTask = createAsyncThunk(
  'add_child_task',
  async ({childId, payload: {name, daysofWeek, starsAwarded, isBonusTask}}) => {
    const payload = {name, daysofWeek, starsAwarded, isBonusTask};
    try {
      const response = await ChildService.createChildTask(childId, payload);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const updateChildTask = createAsyncThunk(
  'update_child_task',
  async ({childId, payload}) => {
    try {
      const response = await ChildService.updateChildTask({childId, payload});
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const getChildTasks = createAsyncThunk(
  'get_child_task',
  async ({childId, time}) => {
    try {
      const payload = {childId, time};
      const response = await ChildService.getChildTasks(payload);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const deleteChildTask = createAsyncThunk(
  'delete_child_task',
  async ({childId, taskId}) => {
    try {
      const payload = {childId, taskId};
      const response = await ChildService.deleteChildTask(payload);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const getChildRewards = createAsyncThunk(
  'get_child_rewards',
  async ({childId, time}) => {
    try {
      const payload = {childId, time};
      const response = await ChildService.getChildRewards(payload);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const createChildReward = createAsyncThunk(
  'get_child_rewards',
  async ({childId, payload: {name, starsNeededToUnlock, emoji}}) => {
    try {
      const payload = {name, starsNeededToUnlock, emoji};
      const response = await ChildService.createChildReward({childId, payload});
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const awardRewardToChild = createAsyncThunk(
  'add_reward_to_child',
  async ({childId, rewardId, date}, {dispatch}) => {
    try {
      const payload = {childId, rewardId, date};
      const response = await ChildService.awardRewardToChild(payload);
      await dispatch(childActions.getAllChildren());
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const deleteChildReward = createAsyncThunk(
  'delete_child_reward',
  async ({childId, rewardId}) => {
    try {
      const payload = {childId, rewardId};
      const response = await ChildService.deleteChildReward(payload);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const updateChildRewards = createAsyncThunk(
  'update_child_reward',
  async ({childId, rewardId, payload: data}) => {
    try {
      const payload = {childId, rewardId, payload: data};
      const response = await ChildService.updateChildReward(payload);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const completeChildTask = createAsyncThunk(
  'complete_child_task',
  async ({childId, taskId, date}) => {
    try {
      const payload = {childId, taskId, date};
      const response = await ChildService.completeChildTask(payload);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const deleteChild = createAsyncThunk(
  'delete_child',
  async ({childId}) => {
    try {
      const response = await ChildService.deleteChild({childId});
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const getCompletedTaskHistory = createAsyncThunk(
  'get_completed_task_history',
  async ({childId}) => {
    try {
      const response = await ChildService.getCompletedTaskHistory({childId});
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const deleteCompletedTaskHistory = createAsyncThunk(
  'delete_completed_task_history',
  async ({childId, taskId}, {dispatch}) => {
    try {
      const params = {childId, taskId};
      const response = await ChildService.deleteCompletedTaskHistory(params);
      await dispatch(childActions.getAllChildren());
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const getRewardsHistory = createAsyncThunk(
  'get_rewards_history',
  async ({childId}) => {
    try {
      const response = await ChildService.getRewadsHistory({childId});
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const deleteRewardsHistory = createAsyncThunk(
  'delete_reward_task_history',
  async ({childId, taskId}, {dispatch}) => {
    try {
      const params = {childId, taskId};
      const response = await ChildService.deleteRewardsHistory(params);
      await dispatch(childActions.getAllChildren());
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const createSpinWheelReward = createAsyncThunk(
  'create_spin_wheel_reward',
  async ({childId}) => {
    try {
      const params = {childId};
      const response = await ChildService.createSpinWheelReward(params);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const updateSpinWheelReward = createAsyncThunk(
  'update_spin_wheel_reward',
  async ({childId}) => {
    try {
      const params = {childId};
      const response = await ChildService.updateSpinWheelReward(params);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const deleteSpinWheelReward = createAsyncThunk(
  'delete_spin_wheel_reward',
  async ({childId}) => {
    try {
      const params = {childId};
      const response = await ChildService.deleteSpinWheelReward(params);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const getSpinWheelRewards = createAsyncThunk(
  'delete_spin_wheel_reward',
  async ({childId}) => {
    try {
      const params = {childId};
      const response = await ChildService.getSpinWheelRewards(params);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const setRewardsGoal = createAsyncThunk(
  'set_rewards_goal',
  async ({rewardsId, childId}) => {
    try {
      const params = {rewardsId, childId};
      const response = await ChildService.setRewardsGoal(params);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const removeAsRewardGoal = createAsyncThunk(
  'remove_rewards_goal',
  async ({rewardsId, childId}) => {
    try {
      const params = {rewardsId, childId};
      const response = await ChildService.removeAsRewardGoal(params);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const createChildSetback = createAsyncThunk(
  'post_child_setback',
  async ({childId, payload: {name, stars, emoji}}) => {
    try {
      const payload = {name, stars, emoji};
      const response = await SetbackService.createChildSetback({
        childId,
        payload,
      });
      console.log('createChildSetback', {response});
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const getChildSetback = createAsyncThunk(
  'get_child_setback',
  async ({childId}) => {
    try {
      const response = await SetbackService.getChildSetback({childId});
      console.log('getChildSetback', {response});
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const deleteChildSetback = createAsyncThunk(
  'delete_child_setback',
  async ({childId, setbackId}) => {
    try {
      const response = await SetbackService.deleteChildSetback({
        childId,
        setbackId,
      });
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const updateChildSetback = createAsyncThunk(
  'update_child_setback',
  async ({childId, payload}) => {
    try {
      const response = await SetbackService.updateChildSetback({
        childId,
        payload,
      });
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const issueChildSetback = createAsyncThunk(
  'issue_child_setback',
  async ({childId, setbackId}, {dispatch}) => {
    try {
      const response = await SetbackService.issueChildSetback({
        childId,
        setbackId,
      });
      await dispatch(childActions.getAllChildren());
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const adjustChildStar = createAsyncThunk(
  'adjust_child_star',
  async ({stars, reason, childId}, {dispatch}) => {
    try {
      const response = await ChildService.adjustChildStar({
        childId,
        reason,
        stars,
      });
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const copyChildTask = createAsyncThunk(
  'copy_child_task',
  async ({childId, tasks}, {dispatch}) => {
    try {
      const resCopyChildTask = await ChildService.copyChildTask({
        childId,
        tasks,
      });
      return resCopyChildTask?.data;
    } catch (err) {
      return {err};
    }
  },
);
