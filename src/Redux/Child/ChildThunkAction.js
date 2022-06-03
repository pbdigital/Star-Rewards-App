import {createAsyncThunk} from '@reduxjs/toolkit';
import {ChildService} from '../../Services/ChildService';

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
  async ({name, avatarId}) => {
    try {
      const response = await ChildService.addChild({
        name,
        avatarId,
      });
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);

export const updateChild = createAsyncThunk(
  'update_child',
  async ({childId, name, avatarId}) => {
    try {
      const response = await ChildService.updateChild({
        childId,
        name,
        avatarId,
      });
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
  async ({childId, rewardId, date}) => {
    try {
      const payload = {childId, rewardId, date};
      const response = await ChildService.awardRewardToChild(payload);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);
