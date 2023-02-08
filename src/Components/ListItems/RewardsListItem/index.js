import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from 'Assets/Images';
import {COLORS} from 'Constants';
import {NAV_ROUTES} from 'Constants';
import {childIdSelector, childStarsSelector} from 'Redux';
import {Image} from '../../Image';
import {Text} from '../../Text';
import {
  Card,
  Container,
  AddItemContainer,
  Root,
  CloseButton,
  StarPlaceholder,
} from './styles';
import {ConfirmationModal} from '../../ConfirmationModal';
import * as Animatable from 'react-native-animatable';
import {childActions} from 'Redux';
import moment from 'moment';
import {doHapticFeedback} from 'Helpers';

const RewardsListItem = ({
  item,
  onItemPress,
  isDeleteMode,
  onItemDeleted,
  onCloseDeleteConfirmationModal,
}) => {
  const {id: rewardId, name, starsNeededToUnlock, emoji, isAddItem} = item;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedChildStar = useSelector(childStarsSelector);
  const [isCardDisabled, setIsCardDisabled] = useState(false);
  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible,
  ] = useState(false);
  const childId = useSelector(childIdSelector);

  useEffect(() => {
    const isEligableForReward =
      parseInt(starsNeededToUnlock, 10) <= selectedChildStar;
    setIsCardDisabled(!isEligableForReward);
  }, [selectedChildStar, starsNeededToUnlock]);

  const handleOnPressItem = useCallback(() => {
    if (isCardDisabled && !isDeleteMode) {
      return;
    }
    onItemPress(item);
  }, [isCardDisabled, onItemPress, item, isDeleteMode]);

  const handleOnPressDeleteButton = () => {
    doHapticFeedback();
    setIsDeleteConfirmationModalVisible(true);
  };

  const deleteReward = useCallback(async () => {
    closeDeleteConfirmationModal();

    const {payload} = await dispatch(
      childActions.deleteChildReward({childId, rewardId}),
    );

    if (payload?.success) {
      await dispatch(
        childActions.getChildRewards({childId, time: moment().format()}),
      );
      onItemDeleted(item);
    } else {
      Alert.alert('Unable to delete rewards right now. Please try again later');
    }
  }, [
    item,
    onItemDeleted,
    childId,
    rewardId,
    dispatch,
    closeDeleteConfirmationModal,
  ]);

  const closeDeleteConfirmationModal = useCallback(() => {
    setIsDeleteConfirmationModalVisible(false);
    if (onCloseDeleteConfirmationModal) {
      onCloseDeleteConfirmationModal();
    }
  }, [onCloseDeleteConfirmationModal]);

  if (isAddItem) {
    return isDeleteMode ? null : (
      <Root
        width="46%"
        paddingBottom={8}
        onPress={() => {
          doHapticFeedback();
          navigation.navigate(NAV_ROUTES.addRewards);
        }}>
        <AddItemContainer>
          <Image
            source={Images.IcAdd}
            width={24}
            height={24}
            style={styles.addIcon}
          />
          <Text
            fontSize={16}
            fontWeight="600"
            lineHeight={24}
            textAlign="center"
            marginTop={20}
            color={COLORS.Blue}>
            Add A Reward
          </Text>
        </AddItemContainer>
      </Root>
    );
  }

  return (
    <Animatable.View
      style={styles.cardAnimRoot}
      onAnimationBegin={() => console.log('animation begin')}>
      <Root onPress={handleOnPressItem} onLongPress={handleOnPressItem}>
        <Card opacity={isCardDisabled && !isDeleteMode ? 0.5 : 1}>
          {isDeleteMode ? (
            <StarPlaceholder />
          ) : (
            <ImageBackground
              source={Images.Star}
              resizeMode="cover"
              style={styles.pointsContainer}>
              <Text
                fontSize={13}
                fontWeight="600"
                lineHeight={20}
                textAlign="center"
                color={COLORS.Gold}>
                {starsNeededToUnlock}
              </Text>
            </ImageBackground>
          )}
          <Container>
            <Text fontSize={60} lineHeight={72} textAlign="center">
              {emoji}
            </Text>
          </Container>
          <Text
            fontSize={16}
            fontWeight="600"
            lineHeight={24}
            textAlign="center"
            marginTop={11}
            color={COLORS.Text.black}>
            {name}
          </Text>
        </Card>
        {isDeleteMode && (
          <CloseButton onPress={handleOnPressDeleteButton}>
            <Image
              source={Images.IcClose}
              width={12}
              height={12}
              tintColor={COLORS.White}
            />
          </CloseButton>
        )}
        <ConfirmationModal
          emoji={item?.emoji}
          isVisible={isDeleteConfirmationModalVisible}
          title="Are you sure you want to delete this reward?"
          negativeButtonText="Cancel"
          positiveButtonText="Delete"
          buttonFontSize={20}
          buttonTextColor={COLORS.Blue}
          onPressPositiveButton={deleteReward}
          onClose={closeDeleteConfirmationModal}
          onPressNegativeButton={closeDeleteConfirmationModal}
        />
      </Root>
    </Animatable.View>
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
  addIcon: {
    tintColor: COLORS.Blue,
  },
  cardAnimRoot: {
    width: '46%',
    height: 160,
    maxHeight: 160,
  },
});

export {RewardsListItem};
