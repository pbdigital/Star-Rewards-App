import moment from 'moment';

export const selectedChildSelector = ({child}) => child.selectedChild;
export const childNameSelector = ({child}) => child.selectedChild?.firstName;
export const childIdSelector = ({child}) => child.selectedChild?.id;
export const childAvatarSelector = ({child}) => child.selectedChild?.avatarId;
export const childStarsSelector = ({child}) => child.selectedChild?.stars || 0;
export const childAllTasksSelector = ({child}) => child.tasks;
export const childRewardsTasksSelector = ({child}) =>
  child?.tasks?.filter(({isBonusTask}) => !isBonusTask) || [];
export const childBonusTasksSelector = ({child}) =>
  child?.tasks?.filter(({isBonusTask}) => isBonusTask) || [];
export const childRewardsSelector = ({child}) => child?.rewards || [];
export const childListSelector = ({child}) => child.childList || [];
export const childStateIsLoadingSelector = ({child}) =>
  child.isLoading || false;
export const childStateAddChildFlowIsEditingSelector = ({child}) =>
  child.addChildFlowIsEditing || false;
export const childStateCongratulateTaskCompletedSelector = ({child}) =>
  child.congratulateTaskCompleted || false;
export const completedTaskHistorySelector = ({child}) =>
  child.completedTaskHistory;
export const rewardsHistorySelector = ({child}) => child?.rewardsHistory || [];
export const selectedDateToShowTaskSelector = ({child}) =>
  child.selectedDateToShowTask || moment().format('MM-DD-YYYY');
export const selectSpinnerWheelData = ({child}) => child.spinnerWheel;
export const childSetbacksSelector = ({child}) => child.setbacks ?? [];
export const childBonusStarViewTypeSelector = ({child}) =>
  child?.selectedChild?.views?.bonusStars ?? [];
export const childStarViewTypeSelector = ({child}) =>
  child?.selectedChild?.views?.stars ?? [];
export const childStatsSelector = ({child}) => child?.selectedChildStats;
export const isCompletingStarsSelector = ({child}) => child?.isCompletingStars;
