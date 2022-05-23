import {AuthService} from '../../Services//AuthService';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const signUp = createAsyncThunk(
  'sign_up',
  async ({firstName, email, password}) => {
    try {
      const response = await AuthService.signUp({
        firstName,
        email,
        password,
      });
      return response.data;
    } catch (err) {
      return {err};
    }
  },
);
