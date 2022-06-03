export const childNameSelector = ({child}) => child.childName;
export const childIdSelector = ({child}) => child.childId;
export const childAvatarSelector = ({child}) => child.avatar;
export const childAllTasksSelector = ({child}) => child.tasks;
export const childRewardsTasksSelector = ({child}) =>
  child?.tasks?.filter(({isBonusTask}) => !isBonusTask);
export const childBonusTasksSelector = ({child}) =>
  child?.tasks?.filter(({isBonusTask}) => isBonusTask);
export const childRewardsSelector = ({child}) => child.rewards || [];
export const childListSelector = ({child}) => child.children || [];
export const childStarsSelector = ({child}) => child.stars || 0;
