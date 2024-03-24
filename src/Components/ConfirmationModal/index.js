import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {
  AlertContainer,
  Col,
  Button,
  ButtonContainer,
  Divider,
  CloseIconButton,
} from './styles';
import {Text} from '../Text';
import {Images} from 'Assets/Images';
import {Image} from '../Image';
import {doHapticFeedback} from 'Helpers';

const ConfirmationModal = ({
  title,
  message,
  isVisible,
  buttonFontSize,
  buttonTextColor,
  onPressPositiveButton,
  onPressNegativeButton,
  negativeButtonText,
  positiveButtonText,
  onClose,
  emoji,
  modalProps = {},
}) => {
  const handleOnCloseModal = () => {
    doHapticFeedback();
    if (onClose) {
      onClose();
    }
  };

  const handleOnPressNegativeButton = () => {
    doHapticFeedback();
    if (onPressNegativeButton) {
      onPressNegativeButton();
    }
  };

  const handleOnPressPositiveButton = () => {
    doHapticFeedback();
    if (onPressPositiveButton) {
      onPressPositiveButton();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      {...modalProps}>
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
          {emoji ? (
            <Text fontSize={90} lineHeight={100} textAlign="center">
              {emoji}
            </Text>
          ) : (
            <Image source={Images.TrashBig} width={77} height={100} />
          )}
          <Text
            textAlign="center"
            fontSize={20}
            marginTop={20}
            lineHeight={30}
            fontWeight="600"
            fontFamily="Poppins-SemiBold"
            color={COLORS.Text.black}>
            {title}
          </Text>
        </Col>

        <ButtonContainer>
          <Button onPress={handleOnPressNegativeButton}>
            <Text
              fontWeight="600"
              fontFamily="Poppins-SemiBold"
              fontSize={buttonFontSize}
              color={buttonTextColor}
              lineHeight={24}>
              {negativeButtonText}
            </Text>
          </Button>
          <Divider />
          <Button onPress={handleOnPressPositiveButton}>
            <Text
              fontWeight="600"
              fontFamily="Poppins-SemiBold"
              fontSize={buttonFontSize}
              color={buttonTextColor}
              lineHeight={24}>
              {positiveButtonText}
            </Text>
          </Button>
        </ButtonContainer>
      </AlertContainer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  isVisible: PropTypes.bool,
  buttonFontSize: PropTypes.number,
  buttonTextColor: PropTypes.string,
  onPressYes: PropTypes.func,
  onPressNo: PropTypes.func,
};

ConfirmationModal.defaultProps = {
  title: 'Title',
  message: 'Message',
  isVisible: false,
  buttonFontSize: 16,
  buttonTextColor: COLORS.Blue,
  onPressYes: () => {},
  onPressNo: () => {},
};

export {ConfirmationModal};
