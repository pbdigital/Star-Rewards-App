export const selectedChildSelector = ({child}) => child.selectedChild;
export const childNameSelector = ({child}) => child.selectedChild?.firstName;
export const childIdSelector = ({child}) => child.selectedChild?.id;
export const childAvatarSelector = ({child}) => child.selectedChild?.avatarId;
export const childStarsSelector = ({child}) => child.selectedChild?.stars || 0;
export const childAllTasksSelector = ({child}) => child.tasks;
export const childRewardsTasksSelector = ({child}) =>
  child?.tasks?.filter(({isBonusTask}) => !isBonusTask);
export const childBonusTasksSelector = ({child}) =>
  child?.tasks?.filter(({isBonusTask}) => isBonusTask);
export const childRewardsSelector = ({child}) => child.rewards || [];
export const childListSelector = ({child}) => child.childList || [];
export const childStateIsLoadingSelector = ({child}) =>
  child.isLoading || false;
