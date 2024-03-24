import React from 'react';
import {Image} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {AlertContainer, Col, CloseIconButton} from './styles';
import {Text} from '../..';

const HelpModal = ({
  title = '',
  content = '',
  isVisible,
  onClose,
  headerImage,
}) => {
  const handleOnCloseModal = () => {
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
        <Col>
          {headerImage ?? null}
          <Text
            textAlign="center"
            fontSize={20}
            marginTop={20}
            lineHeight={30}
            fontWeight="600"
            fontFamily="Poppins-SemiBold"
            marginBottom={16}
            color={COLORS.Text.black}>
            {title}
          </Text>
        </Col>

        <Text
          textAlign="center"
          fontSize={15}
          lineHeight={26}
          fontWeight="400"
          color={COLORS.Text.grey}>
          {content}
        </Text>
      </AlertContainer>
    </Modal>
  );
};

export {HelpModal};
