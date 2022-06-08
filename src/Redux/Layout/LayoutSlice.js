import {createSlice} from '@reduxjs/toolkit';
import {onSetToolbarStarPosition} from './LayoutActionHandler';

const initialState = {
  toolbarStarPosition: null,
};

const {actions, reducer: layoutReducer} = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setToolbarStarPosition: onSetToolbarStarPosition,
  },
});

const layoutActions = {...actions};
export {layoutActions, layoutReducer};
