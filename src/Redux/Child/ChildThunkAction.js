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
