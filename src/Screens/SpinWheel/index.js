import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RewardsToolbar, ScreenBackground, Image, Button, WheelOfFortune, Text} from 'Components';
import {COLORS, NAV_ROUTES} from 'Constants';
import {Images} from 'src/Assets/Images';
import {Content, SafeAreaFooter, Footer} from './styles';
import { useRef } from 'react';

const SpinWheelScreen = () => {
  const navigation = useNavigation();
  const wheelOptionsRef = useRef();
  const handleOnPressHistoryButton = () => {
    navigation.navigate(NAV_ROUTES.history, {
      isRewards: true,
    });
  };

  const participants = [
    'Reward 1',
    'Reward 2',
    'Reward 3',
    'Reward 4',
    'Reward 5',
    'Reward 6',
    'Reward 7',
    'Reward 8',
  ];
  const wheelOptions = {
    rewards: participants,
    knobSize: 50,
    borderWidth: 10,
    borderColor: '#F8D879',
    innerRadius: 24,
    duration: 5000,
    colors: COLORS.wheelItemColors,
    getWinner: (value, index) => {
      console.log({value, index})
    },
    onRef: ref => (wheelOptionsRef.current = ref),
  };
  const renderFooter = () => (
    <SafeAreaFooter edges={['bottom']}>
      <Footer>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Blue}
          shadowColor={COLORS.BlueShadow}
          onPress={() => {
            if (wheelOptionsRef.current) {
              wheelOptionsRef.current._tryAgain();
            }
          }}
          title="Spin The Wheel"
          buttonTitleFontSize={16}
        />
      </Footer>
    </SafeAreaFooter>
  );

  return (
    <ScreenBackground cloudType={0}>
      <RewardsToolbar
        hideAvatar
        hideBackButton
        title="Spin Wheel"
        showBorderBottom
        rightControlButton={
          <TouchableOpacity onPress={handleOnPressHistoryButton}>
            <Image source={Images.IcClock} width={28} height={26} />
          </TouchableOpacity>
        }
      />
      <Content>
        <Text
          fontSize={16}
          lineHeight={28}
          fontWeight="400"
          textAlign="center"
          marginTop={30}>
          Spin the wheel using your stars
          {'\n'}and earn a reward
        </Text>
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => console.log('WIIIIIN', {value, index})}
        />
      </Content>
      {renderFooter()}
    </ScreenBackground>
  );
};

export {SpinWheelScreen};
