import {LIST_TYPE} from '../../Constants';

export const toolbarStarPositionSelector = ({layout}) =>
  layout.toolbarStarPosition;

export const toolBarStarAddedFlagSelector = ({layout}) =>
  layout.toolBarStarAddedFlag;

export const starsViewListTypeSelector = ({layout}) =>
  layout.starsView ?? LIST_TYPE.stars;
export const bonusStarsViewListTypeSelector = ({layout}) =>
  layout.bonusStarsView ?? LIST_TYPE.stars;
