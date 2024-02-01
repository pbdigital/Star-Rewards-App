import React from 'react';
import {TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {AlertContainer, Col, CloseIconButton} from './styles';
import {Button, Text, Image} from '../..';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../../Constants';
import {childNameSelector} from '../../../Redux';
import {useSelector} from 'react-redux';

const StarAdjustmentConfirmedModal = ({isVisible, onClose}) => {
  const navigation = useNavigation();
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

  const handleViewStarAdjustmentHistory = () => {
    doHapticFeedback();
    if (onClose) {
      onClose();
    }
    navigation.navigate(NAV_ROUTES.history, {
      isAdjustments: true,
    });
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
          style={{alignSelf: 'center'}}
        />
        <Col>
          <Text
            textAlign="center"
            fontSize={24}
            lineHeight={36}
            fontWeight="600"
            marginBottom={8}
            color={COLORS.Text.black}>
            Starry Adjustment
            {'\n'}
            Confirmed!
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
            title="Back to stars"
            buttonTitleFontSize={16}
            disabled={false}
          />
          {/* <TouchableOpacity onPress={handleViewStarAdjustmentHistory}>
            <Text
              textAlign="center"
              fontSize={16}
              lineHeight={24}
              fontWeight="600"
              color={COLORS.Blue}>
              View Stars Adjustment History
            </Text>
          </TouchableOpacity> */}
        </Col>
      </AlertContainer>
    </Modal>
  );
};

export {StarAdjustmentConfirmedModal};
