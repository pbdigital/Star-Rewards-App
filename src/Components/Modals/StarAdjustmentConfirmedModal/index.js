import React from 'react';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {Button, Text, Image} from '../..';
import {childNameSelector} from '../../../AppReduxState';
import {useSelector} from 'react-redux';
import {AlertContainer, Col, CloseIconButton, styles} from './styles';

const StarAdjustmentConfirmedModal = ({isVisible, onClose}) => {
  const childName = useSelector(childNameSelector);
  const handleOnCloseModal = () => {
    doHapticFeedback();
    if (onClose) {
      onClose();
    }
  };

  const handleBackToStars = () => {
    doHapticFeedback();
    if (onClose) {
      onClose();
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
        <Image
          source={Images.StarAdjustmentConfirmed}
          width={100}
          height={143}
          style={styles.starAdjustmentImage}
        />
        <Col>
          <Text
            textAlign="center"
            fontSize={24}
            lineHeight={36}
            fontWeight="600"
            marginBottom={8}
            color={COLORS.Text.black}>
            Success!
          </Text>
          <Text
            textAlign="center"
            fontSize={16}
            lineHeight={28}
            fontWeight="400"
            marginBottom={30}
            color={COLORS.Text.grey}>
            {childName} stars count has been fine-tuned to perfection. Thanks
            for nurturing positive growth in your child’s celestial journey.
            Keep shining bright together!
          </Text>
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Green}
            shadowColor={COLORS.GreenShadow}
            onPress={handleBackToStars}
            title="Back to Stars"
            buttonTitleFontSize={16}
            disabled={false}
          />
        </Col>
      </AlertContainer>
    </Modal>
  );
};

export {StarAdjustmentConfirmedModal};
