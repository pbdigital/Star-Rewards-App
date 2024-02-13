import {createSlice} from '@reduxjs/toolkit';
import {
  onSetToolbarStarPosition,
  onSetToolBarStarAddedFlag,
  onSetBonusStarsViewListType,
  onSetStarsViewListType,
} from './LayoutActionHandler';
import {LIST_TYPE} from '../../Constants';

const initialState = {
  toolbarStarPosition: null,
  toolBarStarAddedFlag: 0,
  starsView: LIST_TYPE.stars,
  bonusStarsView: LIST_TYPE.stars,
};

const {actions, reducer: layoutReducer} = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setToolbarStarPosition: onSetToolbarStarPosition,
    setToolBarStarAddedFlag: onSetToolBarStarAddedFlag,
    setStarsViewListType: onSetStarsViewListType,
    setBonusStarsViewListType: onSetBonusStarsViewListType,
  },
});

const layoutActions = {...actions};
export {layoutActions, layoutReducer};
