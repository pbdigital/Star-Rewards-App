import React from 'react';
import {Dimensions, Image} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {
  AlertContainer,
  Col,
  CloseIconButton,
  StarContainer,
  StarImage,
} from './styles';
import {Text} from '../..';
import ConfettiCannon from 'react-native-confetti-cannon';
import {useSelector} from 'react-redux';
import {childNameSelector} from '../../../Redux';

const OffStarCongratulationsModal = ({isVisible, onClose, data}) => {
  const childName = useSelector(childNameSelector);
  const {reason, starsAwarded} = data ?? {};
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
        <StarContainer>
          <StarImage source={Images.Star} />
          <Text
            textAlign="center"
            fontSize={32}
            lineHeight={32}
            fontWeight="700"
            marginLeft={16}
            color={COLORS.Gold}>
            x {starsAwarded}
          </Text>
        </StarContainer>
        <Col>
          <Text
            textAlign="center"
            fontSize={20}
            lineHeight={30}
            fontWeight="600"
            color={COLORS.Text.black}>
            You have successfully
            {'\n'}
            given {`${childName}`}
            {'\n'}
            {starsAwarded} bonus stars for
            {'\n'} "{reason}"!
          </Text>
        </Col>
      </AlertContainer>
      <ConfettiCannon
        count={50}
        origin={{x: Dimensions.get('screen').width / 2, y: -20}}
        fadeOut={true}
        autoStart
      />
    </Modal>
  );
};

export {OffStarCongratulationsModal};
