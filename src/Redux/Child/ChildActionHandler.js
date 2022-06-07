export const onSetChildName = (state, action) => {
  state.childName = action.payload;
};

export const onSetAvatar = (state, action) => {
  state.avatar = action.payload;
};

export const onSetSelectedChild = (state, action) => {
  state.selectedChild = action.payload;
};
