import {Dimensions} from 'react-native';

export const MAX_BONUS_STARS_AWARD_COUNT = 7;
export const REWARD_ITEM_LIMIT = 10;
export const CHILD_SELECTOR_ANIMATION_DURATION_OPEN = 200;
export const CHILD_SELECTOR_ANIMATION_DURATION_CLOSE = 500;

export const Default = {
  Dimensions: {
    Height: Dimensions.get('window').height,
    Width: Dimensions.get('window').width,
  },
};

export const STAR_COUNT_MODE = {
  decrease: 1,
  increase: 2,
  setTotalValue: 3,
};

export const LINK_HELP = 'http://starrewardsapp.com/contact-us';
export const LINK_PRIVACY = 'https://starrewardsapp.com/prviacy';
export const LINK_DELETE_ACCOUNT = 'https://starrewardsapp.com/delete-account';
export const STAR_LIST_TYPE = {
  rewards: 'rewards',
  bonus: 'bonus',
};

export const LIST_TYPE = {
  list: 'list',
  stars: 'stars',
};

export const DATE_FORMAT = 'MM-DD-YYYY';