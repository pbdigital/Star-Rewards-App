export const onSetToolbarStarPosition = (state, action) => {
  state.toolbarStarPosition = action.payload;
};

export const onSetToolBarStarAddedFlag = (state, action) => {
  state.toolBarStarAddedFlag = state.toolBarStarAddedFlag + 1;
};
