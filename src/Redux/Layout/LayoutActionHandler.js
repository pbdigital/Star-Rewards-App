export const onSetToolbarStarPosition = (state, action) => {
  state.toolbarStarPosition = action.payload;
};

export const onSetToolBarStarAddedFlag = (state, action) => {
  state.toolBarStarAddedFlag = state.toolBarStarAddedFlag + 1;
};

export const onSetStarsViewListType = (state, action) => {
  state.starsView = action.payload;
};

export const onSetBonusStarsViewListType = (state, action) => {
  state.bonusStarsView = action.payload;
};
