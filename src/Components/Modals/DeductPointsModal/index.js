import React, {useEffect} from 'react';
import {Image} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {
  AlertContainer,
  Col,
  CloseIconButton,
  BonusStarInfo,
  ItemImage,
  Row,
} from './styles';
import {Button, Text} from '../..';
import {useSelector} from 'react-redux';
import {childNameSelector} from '../../../Redux';

const DeductPointsModal = ({isVisible, onClose, setback}) => {
  const childName = useSelector(childNameSelector);
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
      onBackdropPress={handleOnCloseModal}>
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
          <Row>
            <ItemImage source={Images.Avatar2} />
            <BonusStarInfo source={Images.StarRed}>
              <Text
                marginTop={5}
                fontSize={16}
                lineHeight={24}
                fontWeight="600"
                color={COLORS.White}>
                -10
              </Text>
            </BonusStarInfo>
          </Row>
          <Text
            textAlign="center"
            fontSize={20}
            marginTop={20}
            lineHeight={30}
            fontWeight="600"
            marginBottom={16}
            color={COLORS.Text.black}>
            Disobeying Parents
          </Text>
        </Col>

        <Text
          textAlign="center"
          fontSize={15}
          lineHeight={26}
          fontWeight="400"
          color={COLORS.Text.grey}>
          {/* This action will deduct {starsToDeduct} stars from {childName}. Are you sure you */}
          want to proceed with this action?
        </Text>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnCloseModal}
          title="Deduct 10 Stars"
          buttonTitleFontSize={16}
          disabled={false}
          isLoading={false}
          marginTop={23}
        />
      </AlertContainer>
    </Modal>
  );
};

export {DeductPointsModal};
