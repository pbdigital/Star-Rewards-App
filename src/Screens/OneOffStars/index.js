import React, {useCallback, useState} from 'react';
import {
  AppTextInput,
  Button,
  OffStarCongratulationsModal,
  ScreenBackground,
  StarsAwardedSelector,
  Text,
  Toolbar,
} from '../../Components';
import {COLORS} from '../../Constants';
import {Container, ButtonContainer, ToolbarContainer, styles} from './styles';
import {Alert, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {childActions, childIdSelector} from '../../Redux';

const OneOffStarsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const childId = useSelector(childIdSelector);
  const [starsAwarded, setStarsAwarded] = useState(1);
  const [reason, setReason] = useState('');
  const [reasonInputError, setReasonInputError] = useState('');
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOnSelect = stars => setStarsAwarded(stars);
  const handleOnCloseCongratulationsModal = () => navigation.goBack();
  const handleOnPressGiveStar = useCallback(async () => {
    if (isEmpty(reason)) {
      setReasonInputError('Required');
      return;
    }
    setIsLoading(true);
    const payload = {
      childId,
      isBonus: true,
      stars: starsAwarded,
      reason,
    };
    const {payload: resultPayload} = await dispatch(
      childActions.adjustChildStar(payload),
    );

    if (resultPayload?.success) {
      setShowCongratulationsModal(true);
    } else {
      setTimeout(() => {
        Alert.alert(
          'Star Rewards',
          'Unable to process your request. Please try again later.',
        );
      }, 500);
    }
    setIsLoading(false);
  }, [reason, childId, starsAwarded, dispatch]);
  return (
    <ScreenBackground cloudType={0}>
      <ToolbarContainer>
        <Toolbar title="Reward Bonus Stars" />
      </ToolbarContainer>
      <Container>
        <View>
          <Text
            fontSize={16}
            fontWeight="400"
            lineHeight={26}
            marginBottom={30}
            textAlign="center"
            color={COLORS.Text.grey}>
            Splash a little extra sparkle on your child's day with Instant Star
            Rewards! Whether they've aced a test or simply shown extraordinary
            kindness, you can immediately honor their achievements with bonus
            stars. No need to save or log—just select the number of stars, add a
            reason, and celebrate the moment. It's a quick and heartfelt way to
            say 'well done'.
          </Text>
          <StarsAwardedSelector
            label="Stars To Give"
            selectedStarsAwarded={starsAwarded}
            onSelect={handleOnSelect}
            formLabelStyle={styles.label}
            contentContainerStyle={styles.starSelectorContainer}
            max={50}
          />
          <AppTextInput
            label="Reason Why"
            marginBottom={30}
            onChangeText={setReason}
            errorMessage={reasonInputError}
            value={reason}
          />
        </View>
        <ButtonContainer>
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Green}
            shadowColor={COLORS.GreenShadow}
            onPress={handleOnPressGiveStar}
            title={`Give ${starsAwarded} ${
              starsAwarded > 1 ? 'Stars' : 'Star'
            }`}
            buttonTitleFontSize={16}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </ButtonContainer>
      </Container>
      <OffStarCongratulationsModal
        isVisible={showCongratulationsModal}
        onClose={handleOnCloseCongratulationsModal}
      />
    </ScreenBackground>
  );
};

export {OneOffStarsScreen};
