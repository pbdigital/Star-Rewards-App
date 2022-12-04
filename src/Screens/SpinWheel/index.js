import React, {useRef, useCallback, useMemo} from 'react';
import {Alert, Dimensions, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  RewardsToolbar,
  ScreenBackground,
  Image,
  Button,
  WheelOfFortune,
  Text,
  AppAlertModal,
} from 'Components';
import {COLORS, NAV_ROUTES, SPIN_WHEEL_STARS} from 'Constants';
import {Images} from 'src/Assets/Images';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import ConfettiCannon from 'react-native-confetti-cannon';
import {
  Content,
  SafeAreaFooter,
  Footer,
  SuccessNotificationContainer,
} from './styles';
import {childStarsSelector, childNameSelector} from 'Redux';
import {playSound} from 'Helpers';

const SpinWheelScreen = () => {
  const navigation = useNavigation();
  const wheelOptionsRef = useRef(null);
  const childStarsCount = useSelector(childStarsSelector);
  const childName = useSelector(childNameSelector);
  const [winner, setWinner] = React.useState(null);
  const handleOnPressHistoryButton = () => {
    navigation.navigate(NAV_ROUTES.history, {
      isRewards: true,
    });
  };

  const getWinner = useCallback(reward => {
    if (reward) {
      setWinner(reward);
      setTimeout(() => playSound('award_reward_sound', 'mp3'), 500);
    }
  }, []);

  const renderFooter = useMemo(
    () => (
      <SafeAreaFooter edges={['bottom']}>
        <Footer>
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Blue}
            shadowColor={COLORS.BlueShadow}
            onPress={() => {
              if (childStarsCount < SPIN_WHEEL_STARS) {
                Alert.alert(
                  `${childName} must have ${SPIN_WHEEL_STARS} stars to spin the wheel.`,
                );
                return;
              }
              if (wheelOptionsRef.current) {
                wheelOptionsRef.current.spinWheel();
              }
            }}
            title="Spin The Wheel"
            buttonTitleFontSize={16}
          />
        </Footer>
      </SafeAreaFooter>
    ),
    [wheelOptionsRef, childStarsCount],
  );

  const spinRewardNotification = useMemo(
    () => (
      <AppAlertModal
        isVisible={!isEmpty(winner)}
        onClose={() => setWinner(null)}>
        <SuccessNotificationContainer>
          <Text fontSize={90} lineHeight={100} textAlign="center">
            {winner?.emoji}
          </Text>
          <Text
            fontSize={20}
            lineHeight={30}
            marginTop={10}
            fontWeight="600"
            textAlign="center">
            {`Congratulations!\nYou got a ${winner?.name}.`}
          </Text>
        </SuccessNotificationContainer>
      </AppAlertModal>
    ),
    [winner],
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
        <WheelOfFortune onWinReward={getWinner} ref={wheelOptionsRef} />
      </Content>
      {renderFooter}
      {spinRewardNotification}
      {!isEmpty(winner) && (
        <ConfettiCannon
          count={50}
          origin={{x: Dimensions.get('screen').width / 2, y: 0}}
          fadeOut={true}
        />
      )}
    </ScreenBackground>
  );
};

export {SpinWheelScreen};
