import {initialState} from './ChildSlice';

export const onSetChildName = (state, action) => {
  state.childName = action.payload;
};

export const onSetAvatar = (state, action) => {
  state.avatar = action.payload;
};

export const onSetSelectedChild = (state, action) => {
  state.selectedChild = action.payload;
};

export const onResetChildInfo = (state, action) => {
  state.selectedChild = initialState.selectedChild;
  state.tasks = initialState.tasks;
  state.rewards = initialState.rewards;
  state.childList = initialState.childList;
  state.isLoading = initialState.isLoading;
};

export const onSetIsLoading = (state, action) => {
  state.isLoading = action.payload;
};
