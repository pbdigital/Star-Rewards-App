import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {COLORS} from '../../Constants/Colors';
import {
  AlertContainer,
  Col,
  Button,
  ButtonContainer,
  Divider,
  CloseIconButton,
} from './styles';
import {Text} from '../Text';
import {Images} from '../../Assets/Images';
import {Image} from '../Image';

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
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <AlertContainer>
        <CloseIconButton onPress={onClose}>
          <Image
            source={Images.IcClose}
            width={16}
            height={16}
            tintColor={COLORS.Text.lightGrey}
          />
        </CloseIconButton>
        <Col>
          <Image source={Images.TrashBig} width={77} height={100} />
          <Text
            textAlign="center"
            fontSize={20}
            marginTop={20}
            lineHeight={30}
            fontWeight="600"
            color={COLORS.Text.black}>
            {title}
          </Text>
        </Col>

        <ButtonContainer>
          <Button onPress={onPressNegativeButton}>
            <Text
              fontWeight="600"
              fontSize={buttonFontSize}
              color={buttonTextColor}
              lineHeight={24}>
              {negativeButtonText}
            </Text>
          </Button>
          <Divider />
          <Button onPress={onPressPositiveButton}>
            <Text
              fontWeight="600"
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
