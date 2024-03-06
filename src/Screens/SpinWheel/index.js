import React, {useRef, useCallback, useMemo} from 'react';
import {Alert, Dimensions} from 'react-native';
import {
  RewardsToolbar,
  ScreenBackground,
  Button,
  WheelOfFortune,
  Text,
  AppAlertModal,
  HistoryButton,
} from 'Components';
import {COLORS, HISTORY_TAB, SPIN_WHEEL_STARS} from 'Constants';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import ConfettiCannon from 'react-native-confetti-cannon';
import {childStarsSelector, childNameSelector} from 'Redux';
import {playSound} from 'Helpers';
import {
  Content,
  SafeAreaFooter,
  Footer,
  SuccessNotificationContainer,
} from './styles';

const SpinWheelScreen = () => {
  const wheelOptionsRef = useRef(null);
  const childStarsCount = useSelector(childStarsSelector);
  const childName = useSelector(childNameSelector);
  const [winner, setWinner] = React.useState(null);

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
    [wheelOptionsRef, childStarsCount, childName],
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
        rightControlButton={<HistoryButton tab={HISTORY_TAB.rewards} />}
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
