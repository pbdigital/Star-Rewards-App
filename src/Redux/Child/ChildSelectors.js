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
export const childRewardsSelector = ({child}) => child.rewards || [];
export const childListSelector = ({child}) => child.childList || [];
export const childStateIsLoadingSelector = ({child}) =>
  child.isLoading || false;
export const childStateAddChildFlowIsEditingSelector = ({child}) =>
  child.addChildFlowIsEditing || false;
export const childStateCongratulateTaskCompletedSelector = ({child}) =>
  child.congratulateTaskCompleted || false;

const MOCK_DATA_COMPLETED = {
  'Today': [
    {
      childId: 261,
      id: 670,
      isBonusTask: true,
      name: 'MOCK Test 1',
      starsAwarded: 1,
      daysofWeek: [1],
      date: '4/30/2022',
    },
    {
      childId: 261,
      id: 671,
      isBonusTask: true,
      name: 'MOCK Test 2',
      starsAwarded: 1,
      daysofWeek: [1],
      date: '4/30/2022',
    },
  ],
  'Yesterday': [
    {
      childId: 261,
      id: 673,
      isBonusTask: true,
      name: 'MOCK Test 3',
      starsAwarded: 1,
      daysofWeek: [1],
      date: '4/30/2022',
    },
    {
      childId: 261,
      id: 674,
      isBonusTask: true,
      name: 'MOCK Test 4',
      starsAwarded: 1,
      daysofWeek: [1],
      date: '4/30/2022',
    },
  ],
  'Aug 1, 2022': [
    {
      childId: 261,
      id: 675,
      isBonusTask: true,
      name: 'MOCK Test 5',
      starsAwarded: 1,
      daysofWeek: [1],
      date: '4/30/2022',
    },
  ],
};

export const completedTaskHistorySelector = ({child}) => MOCK_DATA_COMPLETED;

const MOCK_DATA_REWARDS_HISTORY = [
  {
    id: '669',
    name: 'MOCK REWARDS HISTORY Test 1',
    childId: '244',
    emoji: '😁',
    starsNeededToUnlock: '3',
    date: '4/30/2022',
  },
  {
    id: '670',
    name: 'Test 2',
    childId: '244',
    emoji: '😁',
    starsNeededToUnlock: '4',
    date: '6/3/2022',
  },
  {
    id: '671',
    name: 'Test 3',
    childId: '244',
    emoji: '😁',
    starsNeededToUnlock: '3',
    date: '6/10/2022',
  },
];

export const rewardsHistorySelector = ({child}) => MOCK_DATA_REWARDS_HISTORY;
// child.rewardsHistory || [];
