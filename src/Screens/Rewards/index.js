import React from 'react';
import {Images} from '../../Assets/Images';
import {Image, RewardsToolbar, ScreenBackground} from '../../Components';

const RewardsScreen = () => {
  return (
    <ScreenBackground cloudType={0}>
      <RewardsToolbar
        hideAvatar
        title="Rewards"
        showBorderBottom
        rightControlButton={
          <Image source={Images.IcClock} width={28} height={25} />
        }
      />
    </ScreenBackground>
  );
};

export {RewardsScreen};
