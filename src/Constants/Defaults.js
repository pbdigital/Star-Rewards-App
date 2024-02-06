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
};

export const GIVE_ONE_OFF_STAR_TYPE = 'GIVE_ONE_OFF_STAR_TYPE';
