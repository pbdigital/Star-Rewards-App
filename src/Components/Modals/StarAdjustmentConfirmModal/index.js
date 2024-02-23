import React, {useCallback, useMemo} from 'react';
import {Image} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {AlertContainer, Col, CloseIconButton, styles} from './styles';
import {Button, StarInfoItem, StarPoints, Text} from '../..';
import {InfoContainer} from './styles';
import {useSelector} from 'react-redux';
import {
  childIdSelector,
  childNameSelector,
  childStarsSelector,
} from '../../../Redux';
import {STAR_COUNT_MODE} from '../../../Constants';

const StarAdjustmentConfirmModal = ({
  isVisible,
  onClose,
  onConfirm,
  adjustmentData,
  isProcessing,
}) => {
  const childStar = useSelector(childStarsSelector);
  const childName = useSelector(childNameSelector);
  const childId = useSelector(childIdSelector);
  const proposedStarCount = useMemo(() => {
    const {selectedMode, starQuantity} = adjustmentData;
    const iChildStar = parseInt(childStar, 10);
    const iStarQuality = parseInt(starQuantity, 10);
    let childNewStarCount = 0;
    if (selectedMode === STAR_COUNT_MODE.increase) {
      childNewStarCount = iChildStar + iStarQuality;
    } else if (selectedMode === STAR_COUNT_MODE.decrease) {
      childNewStarCount = iChildStar - iStarQuality;
    } else if (selectedMode === STAR_COUNT_MODE.setTotalValue) {
      childNewStarCount = iStarQuality;
    }
    return childNewStarCount >= 0 ? childNewStarCount : 0;
  }, [adjustmentData, childStar]);
  const adjustmentValue = useMemo(() => {
    const {selectedMode, starQuantity} = adjustmentData;
    if (selectedMode === STAR_COUNT_MODE.setTotalValue) {
      if (starQuantity > childStar) {
        return starQuantity - childStar;
      } else {
        return childStar - starQuantity;
      }
    }
    return starQuantity;
  }, [adjustmentData, childStar]);
  const adjustmentMode = useMemo(() => {
    const {selectedMode, starQuantity} = adjustmentData;
    if (selectedMode === STAR_COUNT_MODE.setTotalValue) {
      if (starQuantity > childStar) {
        return STAR_COUNT_MODE.increase;
      } else {
        return STAR_COUNT_MODE.decrease;
      }
    }
    return selectedMode;
  }, [adjustmentData, childStar]);
  const handleOnCloseModal = () => {
    doHapticFeedback();
    if (onClose) {
      onClose();
    }
  };

  const handleConfirmAdjustment = useCallback(() => {
    doHapticFeedback();
    if (onConfirm) {
      onConfirm({
        stars: proposedStarCount,
        reason: adjustmentData?.reason,
        childId,
      });
    }
  }, [adjustmentData, proposedStarCount, childId, onConfirm]);

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={onClose}>
      <AlertContainer>
        <CloseIconButton onPress={handleOnCloseModal}>
          <Image
            source={Images.IcClose}
            width={16}
            height={16}
            tintColor={COLORS.Text.lightGrey}
          />
        </CloseIconButton>
        <Col>
          <Text
            textAlign="center"
            fontSize={24}
            lineHeight={36}
            fontWeight="600"
            marginBottom={16}
            color={COLORS.Text.black}>
            Confirm
            {'\n'}
            Stars Adjustment
          </Text>
          <Text
            fontSize={16}
            fontWeight="400"
            lineHeight={28}
            textAlign="center"
            color={COLORS.Text.grey}>
            Ensure the stars align just right for
            {'\n'}
            {childName}.
          </Text>
          <InfoContainer>
            <StarInfoItem
              label="Current Star Count:"
              value={
                <StarPoints
                  value={childStar}
                  contentContainerStyle={styles.starPointContainer}
                />
              }
              hasBottomBorder
            />
            <StarInfoItem
              label="Adjustment:"
              value={
                <StarPoints
                  mode={adjustmentMode}
                  value={adjustmentValue}
                  contentContainerStyle={styles.starPointContainer}
                />
              }
              hasBottomBorder
            />
            <StarInfoItem
              label="Proposed Star Count:"
              value={
                <StarPoints
                  value={proposedStarCount}
                  contentContainerStyle={styles.starPointContainer}
                />
              }
            />
          </InfoContainer>
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Green}
            shadowColor={COLORS.GreenShadow}
            onPress={handleConfirmAdjustment}
            title="Confirm Adjustment"
            buttonTitleFontSize={16}
            disabled={isProcessing}
            isLoading={isProcessing}
          />
        </Col>
      </AlertContainer>
    </Modal>
  );
};

export {StarAdjustmentConfirmModal};
