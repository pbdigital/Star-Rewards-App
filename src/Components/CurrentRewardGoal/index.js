import React, {useEffect, useCallback, useState} from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from 'Constants';
import {Images} from 'src/Assets/Images';
import {Text} from '../Text';
import * as Progress from 'react-native-progress';
import {Button} from '../Button';
import {useSelector} from 'react-redux';
import {isReadOnlySelector} from 'Redux';
import {
  Container,
  Header,
  Reward,
  Stats,
  Details,
  MedalIcon,
  Content,
  ProgressBarContainer,
  ButtonContainer,
} from './styles';

const CurrentRewardGoal = ({
  onPressMedalIcon,
  contentContainerStyle,
  onPressClaimReward,
}) => {
  const isReadOnly = useSelector(isReadOnlySelector);
  const [disableClaimRewardButton, setDisableClaimRewardButton] =
    useState(true);
  const currentRewardGoal = useSelector(({child}) =>
    child?.rewards?.find(({is_goal}) => is_goal),
  );
  const selectedChild = useSelector(({child}) => child?.selectedChild);

  useEffect(() => {
    const currentChildStarCount = selectedChild?.stars || 0;
    const remainingRewardStarCount =
      currentRewardGoal?.starsNeededToUnlock - currentChildStarCount;
    setDisableClaimRewardButton(remainingRewardStarCount > 0);
  }, [selectedChild, currentRewardGoal]);

  const getRemainingStarsLabel = useCallback(() => {
    const getStarPluralText = count => (count === 1 ? 'star' : 'stars');
    const currentChildStarCount = selectedChild?.stars || 0;
    const currentChildStarPluralText = getStarPluralText(currentChildStarCount);

    const remainingRewardStarCount =
      currentRewardGoal?.starsNeededToUnlock - currentChildStarCount;
    const remainingStarPluralText = getStarPluralText(remainingRewardStarCount);

    if (remainingRewardStarCount > 0) {
      return `${currentChildStarCount} ${currentChildStarPluralText} earned - ${remainingRewardStarCount} ${remainingStarPluralText} to go`;
    } else {
      return `${currentChildStarCount} of ${currentRewardGoal?.starsNeededToUnlock} stars earned`;
    }
  }, [selectedChild, currentRewardGoal]);

  const getProgessPercentage = useCallback(() => {
    const currentChildStarCount = selectedChild?.stars || 0;
    const needsToUnlockCount = currentRewardGoal?.starsNeededToUnlock
      ? parseInt(currentRewardGoal?.starsNeededToUnlock, 10)
      : 0;
    const percentage = needsToUnlockCount
      ? currentChildStarCount / needsToUnlockCount
      : 0;
    return percentage;
  }, [selectedChild, currentRewardGoal]);

  const handleOnPressMedalIcon = useCallback(() => {
    const {id: rewardsId, childId} = currentRewardGoal;
    const params = {
      rewardsId,
      childId,
    };
    onPressMedalIcon && onPressMedalIcon(params);
  }, [currentRewardGoal, onPressMedalIcon]);

  const handleOnPressClaimReward = useCallback(() => {
    onPressClaimReward && onPressClaimReward(currentRewardGoal);
  }, [onPressClaimReward, currentRewardGoal]);

  if (!currentRewardGoal) {
    return null;
  }

  return (
    <Container style={contentContainerStyle ?? {}}>
      <Header>
        <Text
          fontSize={16}
          fontWeight="600"
          lineHeight={28}
          textAlign="left"
          color={COLORS.White}>
          Your current reward goal
        </Text>
        <TouchableOpacity onPress={handleOnPressMedalIcon}>
          <MedalIcon source={Images.MedalActive} />
        </TouchableOpacity>
      </Header>
      <Reward>
        <Text fontSize={60} lineHeight={68} marginRight={15}>
          {currentRewardGoal?.emoji}
        </Text>
        <Content>
          <Stats>
            <Details>
              <Text
                fontSize={16}
                fontWeight="600"
                lineHeight={24}
                textAlign="left"
                color={COLORS.Text.black}>
                {currentRewardGoal?.name}
              </Text>
              <ImageBackground
                source={Images.Star}
                resizeMode="cover"
                style={styles.pointsContainer}>
                <Text
                  fontSize={13}
                  fontWeight="600"
                  lineHeight={20}
                  textAlign="center"
                  marginTop={4}
                  color={COLORS.Gold}>
                  {currentRewardGoal?.starsNeededToUnlock}
                </Text>
              </ImageBackground>
            </Details>
          </Stats>
          <ProgressBarContainer>
            <Progress.Bar
              progress={getProgessPercentage()}
              width={null}
              unfilledColor="rgba(193, 236, 190, 0.5)"
              borderColor="transparent"
              color={COLORS.Green}
              borderRadius={100}
              height={10}
              borderWidth={0}
            />
          </ProgressBarContainer>
          <Text
            fontSize={13}
            fontWeight="400"
            lineHeight={20}
            textAlign="left"
            color={COLORS.Text.black}>
            {getRemainingStarsLabel()}
          </Text>
        </Content>
      </Reward>
      {!isReadOnly && (
        <ButtonContainer>
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Green}
            shadowColor={COLORS.GreenShadow}
            onPress={handleOnPressClaimReward}
            title="Claim Reward"
            buttonTitleFontSize={16}
            disabled={disableClaimRewardButton}
          />
        </ButtonContainer>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  pointsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 32,
    height: 31,
  },
});

export {CurrentRewardGoal};
