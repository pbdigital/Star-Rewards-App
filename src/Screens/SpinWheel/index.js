import React, {useRef, useCallback, useMemo, useEffect} from 'react';
import {Alert, Dimensions, TouchableOpacity} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  RewardsToolbar,
  ScreenBackground,
  Image,
  Button,
  WheelOfFortune,
  Text,
  AppAlertModal,
} from 'Components';
import {COLORS, NAV_ROUTES} from 'Constants';
import {Images} from 'src/Assets/Images';
import {useSelector} from 'react-redux';
import {childRewardsSelector} from 'Redux';
import {isEmpty} from 'lodash';
import ConfettiCannon from 'react-native-confetti-cannon';
import {
  Content,
  SafeAreaFooter,
  Footer,
  SuccessNotificationContainer,
} from './styles';
import {childStarsSelector, childNameSelector} from 'Redux';
import {SPIN_WHEEL_STARS} from 'src/Constants/SpinWheel';

const SpinWheelScreen = () => {
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const wheelOptionsRef = useRef();
  const rewards = useSelector(childRewardsSelector);
  const childStarsCount = useSelector(childStarsSelector);
  const childName = useSelector(childNameSelector);
  const [winner, setWinner] = React.useState(null);
  const handleOnPressHistoryButton = () => {
    navigation.navigate(NAV_ROUTES.history, {
      isRewards: true,
    });
  };

  useEffect(() => {
    if (!isFocus) return;
    const msg = 'Please add at least 2 rewards to spin the wheel.';
    const navigateBack = () => {
      navigation?.navigate(NAV_ROUTES.bottomTabNavigator, {
        screen: NAV_ROUTES.rewardsStackNavigator,
      });
    };
    const OK_BUTTON = {
      text: 'OK',
      onPress: navigateBack,
    };

    if (!rewards) {
      Alert.alert('No rewards found.', msg, [OK_BUTTON]);
    } else if (rewards.length <= 1) {
      Alert.alert('', msg, [OK_BUTTON]);
    }
  }, [isFocus, rewards]);

  const getParticipants = useCallback(() => {
    const cloneRewards = rewards ? [...rewards] : [];
    return cloneRewards.map((_, index) => `Reward ${index + 1}`);
  }, [rewards]);

  const getWinner = useCallback(
    (value, index) => {
      if (rewards) {
        setWinner(rewards[index]);
      }
    },
    [rewards],
  );

  const wheelOptions = useMemo(() => {
    return {
      rewards: getParticipants(),
      knobSize: 50,
      borderWidth: 10,
      borderColor: '#F8D879',
      innerRadius: 24,
      duration: 5000,
      colors: COLORS.wheelItemColors,
      onRef: ref => (wheelOptionsRef.current = ref),
    };
  }, [rewards, getParticipants]);

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
                  `${childName} must have ${SPIN_WHEEL_STARS} to spin the wheel.`,
                );
                return;
              }
              if (wheelOptionsRef.current) {
                wheelOptionsRef.current._tryAgain();
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
        <WheelOfFortune options={wheelOptions} getWinner={getWinner} />
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
