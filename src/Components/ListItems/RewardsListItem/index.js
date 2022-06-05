import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Images} from '../../../Assets/Images';
import {COLORS} from '../../../Constants/Colors';
import {NAV_ROUTES} from '../../../Constants/Navigations';
import {childStarsSelector} from '../../../Redux/Child/ChildSelectors';
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

const RewardsListItem = ({
  item,
  onItemPress,
  onLongPress,
  isDeleteMode,
  onItemDeleted,
}) => {
  const {name, starsNeededToUnlock, emoji, isAddItem} = item;

  const navigation = useNavigation();
  const selectedChildStar = useSelector(childStarsSelector);
  const [isCardDisabled, setIsCardDisabled] = useState(false);
  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible,
  ] = useState(false);

  useEffect(() => {
    const isEligableForReward =
      parseInt(starsNeededToUnlock, 10) <= selectedChildStar;
    setIsCardDisabled(!isEligableForReward);
  }, [selectedChildStar, starsNeededToUnlock]);

  const handleOnPressItem = useCallback(() => {
    if (isDeleteMode) {
      return;
    }

    if (isCardDisabled) {
      return;
    }
    onItemPress(item);
  }, [isCardDisabled, isDeleteMode, onItemPress, item]);

  const handleOnPressDeleteButton = () => {
    setIsDeleteConfirmationModalVisible(true);
  };

  const deleteReward = useCallback(() => {
    closeDeleteConfirmationModal();
    onItemDeleted(item);
  }, [item, onItemDeleted]);

  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationModalVisible(false);
  };

  if (isAddItem) {
    return isDeleteMode ? null : (
      <Root
        paddingBottom={8}
        onPress={() => navigation.navigate(NAV_ROUTES.addRewards)}>
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
    <Root onPress={handleOnPressItem} onLongPress={onLongPress}>
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
});

export {RewardsListItem};
