import {createAsyncThunk} from '@reduxjs/toolkit';
import {ChildService} from '../../Services/ChildService';

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

export const createChildTask = createAsyncThunk(
  'add_child_task',
  async (childId, {name, daysofWeek, starsAwarded, isBonusTask}) => {
    const payload = {name, daysofWeek, starsAwarded, isBonusTask};
    try {
      const response = await ChildService.createChildTask(childId, payload);
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);
