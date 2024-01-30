import React from 'react';
import {Image} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {AlertContainer, Col, CloseIconButton} from './styles';
import {Button, StarInfoItem, StarPoints, Text} from '../..';
import {InfoContainer} from './styles';

const StarAdjustmentConfirmModal = ({isVisible, onClose, onConfirm}) => {
  const handleOnCloseModal = () => {
    doHapticFeedback();
    if (onClose) {
      onClose();
    }
  };

  const handleConfirmAdjustment = () => {
    doHapticFeedback();
    if (onConfirm) {
      onConfirm();
    }
  };

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
            [Child's Name]
          </Text>
          <InfoContainer>
            <StarInfoItem
              label="Current Star Count:"
              value={<StarPoints value={5} />}
              hasBottomBorder
            />
            <StarInfoItem
              label="Adjustment:"
              value={<StarPoints value={5} />}
              hasBottomBorder
            />
            <StarInfoItem
              label="Proposed Star Count:"
              value={<StarPoints value={5} />}
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
            disabled={false}
          />
        </Col>
      </AlertContainer>
    </Modal>
  );
};

export {StarAdjustmentConfirmModal};
