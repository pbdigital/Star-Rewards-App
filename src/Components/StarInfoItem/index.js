import React, {useMemo} from 'react';
import {Text} from '../../Components';
import {StarContainer, BonusStarInfo, ItemContainer} from './styles';
import {COLORS, STAR_COUNT_MODE} from '../../Constants';
import {Images} from '../../Assets/Images';

const StarPoints = ({mode, value}) => {
  let color = '#B46C00';

  switch (mode) {
    case STAR_COUNT_MODE.decrease:
      color = COLORS.Red;
      break;
    case STAR_COUNT_MODE.increase:
      color = COLORS.Green;
      break;
    default:
      break;
  }
  return (
    <StarContainer>
      <BonusStarInfo source={Images.Star} />
      <Text
        fontSize={16}
        fontWeight="600"
        lineHeight={24}
        marginLeft={8}
        color={color}>
        {value}
      </Text>
    </StarContainer>
  );
};

const Label = ({value}) => (
  <Text
    fontSize={14}
    fontWeight="500"
    lineHeight={24}
    color={COLORS.Text.black}>
    {value}
  </Text>
);

const StarInfoItem = ({value, label, hasBottomBorder}) => {
  const rightComponent = useMemo(() => {
    if (typeof value === 'string') {
      return (
        <Text
          fontSize={14}
          fontWeight="500"
          lineHeight={24}
          marginLeft={8}
          color={COLORS.Text.grey}>
          {value}
        </Text>
      );
    }

    return value;
  }, [value]);

  return (
    <ItemContainer hasBottomBorder={hasBottomBorder}>
      <Label value={label} />
      {rightComponent}
    </ItemContainer>
  );
};

export {StarInfoItem, StarPoints};
