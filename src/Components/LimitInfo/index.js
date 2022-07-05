import React from 'react';
import {Images} from 'Assets/Images';
import {COLORS} from 'Constants/Colors';
import {REWARD_ITEM_LIMIT} from 'Constants/Defaults';
import {Image} from '../Image';
import {Text} from '../Text';
import {InfoContainer} from './styles';

const LimitInfo = () => {
  return (
    <InfoContainer>
      <Image source={Images.IcInfo} height={20} width={20} />
      <Text
        marginLeft={10}
        fontSize={16}
        lineHeight={24}
        fontWeight="500"
        color={COLORS.Blue}>
        You can only add up to {REWARD_ITEM_LIMIT} tasks
      </Text>
    </InfoContainer>
  );
};

export {LimitInfo};
