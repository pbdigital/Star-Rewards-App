import React from 'react';
import {Image} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {AlertContainer, Col, CloseIconButton} from './styles';
import {Text} from '../..';

const HelpModal = ({isVisible, onClose}) => {
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
          <Image
            source={Images.StarRed}
            width={60}
            height={60}
            resizeMode="contain"
          />
          <Text
            textAlign="center"
            fontSize={20}
            marginTop={20}
            lineHeight={30}
            fontWeight="600"
            marginBottom={16}
            color={COLORS.Text.black}>
            Star Setbacks
          </Text>
        </Col>

        <Text
          textAlign="center"
          fontSize={15}
          lineHeight={26}
          fontWeight="400"
          color={COLORS.Text.grey}>
          Setbacks are a way to help children learn from their mistakes and
          improve their behavior. When a child displays negative behavior, such
          as not sharing with others or being rude, parents can deduct stars
          from their star point total as a consequence.
          {'\n\n'}
          Each negative behavior is associated with an emoji and a corresponding
          number of stars to be deducted. The child can earn back stars by
          displaying positive behavior and completing tasks. We believe that
          setbacks, along with rewards, can help children develop good habits
          and learn important life skills.
        </Text>
      </AlertContainer>
    </Modal>
  );
};

export {HelpModal};
