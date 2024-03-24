/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
import {Text} from '../../Components';
import {StarContainer, BonusStarInfo, ItemContainer} from './styles';
import {COLORS, STAR_COUNT_MODE} from '../../Constants';
import {Images} from '../../Assets/Images';

const StarPoints = ({mode, value, contentContainerStyle = {}}) => {
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
    <StarContainer style={contentContainerStyle}>
      <BonusStarInfo source={Images.Star} />
      <Text
        fontSize={16}
        fontWeight="600"
        fontFamily="Poppins-SemiBold"
        lineHeight={24}
        marginLeft={STAR_COUNT_MODE.decrease ? 12 : 8}
        numberOfLines={1}
        color={color}>
        {mode === STAR_COUNT_MODE.decrease && '-'}
        {value}
      </Text>
    </StarContainer>
  );
};

const Label = ({value}) => (
  <Text
    fontSize={14}
    fontWeight="500"
    fontFamily="Poppins-Medium"
    lineHeight={24}
    marginRight={8}
    style={{flex: 2}}
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
          fontFamily="Poppins-Medium"
          lineHeight={24}
          marginLeft={8}
          style={{flex: 1}}
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
