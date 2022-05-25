import React from 'react';
import {Text} from '../../Text';
import {Images} from '../../../Assets/Images';
import {COLORS} from '../../../Constants/Colors';
import {Star} from './styles';

const TaskStarListItem = ({contentContainerStyle, task}) => {
  const {name} = task;
  return (
    <Star
      source={Images.Star}
      resizeMode="cover"
      style={contentContainerStyle || {}}>
      <Text
        style={{maxWidth: 60}}
        fontSize={11}
        fontWeight="500"
        lineHeight={16}
        textAlign="center"
        marginTop={10}
        numberOfLines={2}
        color={COLORS.Gold}>
        {name}
      </Text>
    </Star>
  );
};

export {TaskStarListItem};
