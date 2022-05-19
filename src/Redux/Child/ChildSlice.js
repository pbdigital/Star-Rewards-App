import {createSlice} from '@reduxjs/toolkit';
import {onSetChildName, onSetAvatar} from './ChildActionHandler';

const initialState = {
  childName: '',
  avatar: null,
  tasks: [],
};

export const childSlice = createSlice({
  name: 'child',
  initialState,
  reducers: {
    setChildName: onSetChildName,
    setAvatar: onSetAvatar,
  },
});

export const {setChildName, setAvatar} = childSlice.actions;
export const childReducer = childSlice.reducer;
