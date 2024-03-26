import {Images} from 'src/Assets/Images';

export const RESTRICTIONS = {
  children: 1,
  tasks: 5,
  bonusTasks: 5,
  rewards: 1,
  setbacks: 5,
  adhocBonusTasks: 3, // Todo: Verify what is AdHoc Bonus Task
};

export const IapLandingScreenContent = {
  default: {
    image: {
      source: Images.IapGeneral,
      width: 298,
      height: 260,
    },
    header: "You've hit the usage limit for this feature",
    subHeader:
      'unlock more attempts to continue enjoying uninterrupted fun and challenges!',
  },
  children: {
    image: {
      source: Images.IapChild,
      width: 298,
      height: 258,
    },
    header: "You're limited to adding just one child",
    subHeader:
      'Upgrade to maximize family flexibility and add numerous children hassle-free.',
  },
  tasks: {
    image: {
      source: Images.IapTask,
      width: 298,
      height: 253,
    },
    header: "You've reached the maximum task limit",
    subHeader:
      'Reached your task limit? Upgrade now to add more tasks hassle-free',
  },
};
