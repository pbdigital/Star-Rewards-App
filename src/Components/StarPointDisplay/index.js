import React from 'react';
import {Images} from '../../Assets/Images';
import {COLORS} from '../../Constants/Colors';
import {Image} from '../Image';
import {Text} from '../Text';
import {Points} from './styles';

const StartPointDisplay = ({marginRight}) => {
  return (
    <Points marginRight={marginRight}>
      <Image source={Images.Star} width={30} height={29} marginRight={10} />
      <Text
        fontSize={20}
        lineHeight={30}
        fontWeight="600"
        textAlign="center"
        color={COLORS.Gold}>
        0
      </Text>
    </Points>
  );
};

export {StartPointDisplay};
