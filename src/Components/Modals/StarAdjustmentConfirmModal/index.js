import React, {useCallback, useMemo} from 'react';
import {Image} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {AlertContainer, Col, CloseIconButton} from './styles';
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
    } else {
      childNewStarCount = iChildStar - iStarQuality;
    }
    return childNewStarCount >= 0 ? childNewStarCount : 0;
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
            textAlign="center"
            fontSize={16}
            lineHeight={28}
            fontWeight="400"
            marginBottom={16}
            color={COLORS.Text.grey}>
            Ensure the stars align just right for
            {'\n'}
            {childName}.
          </Text>
          <InfoContainer>
            <StarInfoItem
              label="Current Star Count:"
              value={<StarPoints value={childStar} />}
              hasBottomBorder
            />
            <StarInfoItem
              label="Adjustment:"
              value={
                <StarPoints
                  mode={adjustmentData.selectedMode}
                  value={adjustmentData.starQuantity}
                />
              }
              hasBottomBorder
            />
            <StarInfoItem
              label="Proposed Star Count:"
              value={<StarPoints value={proposedStarCount} />}
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
