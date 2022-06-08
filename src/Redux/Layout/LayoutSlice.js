import {createSlice} from '@reduxjs/toolkit';
import {
  onSetToolbarStarPosition,
  onSetToolBarStarAddedFlag,
} from './LayoutActionHandler';

const initialState = {
  toolbarStarPosition: null,
  toolBarStarAddedFlag: 0,
};

const {actions, reducer: layoutReducer} = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setToolbarStarPosition: onSetToolbarStarPosition,
    setToolBarStarAddedFlag: onSetToolBarStarAddedFlag,
  },
});

const layoutActions = {...actions};
export {layoutActions, layoutReducer};
