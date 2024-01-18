import React, {useCallback} from 'react';
import {Alert, Image} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {childActions, childIdSelector, childNameSelector} from '../../../Redux';

const DeductPointsModal = ({isVisible, onClose, setback, isLoading}) => {
  const dispatch = useDispatch();
  const childName = useSelector(childNameSelector);
  const childId = useSelector(childIdSelector);
  const handleOnCloseModal = () => {
    doHapticFeedback();
    if (onClose) {
      onClose();
    }
  };

  const handleOnPressDeductStarButton = useCallback(async () => {
    isLoading(true);
    onClose();
    const result = await dispatch(
      childActions.issueChildSetback({
        childId,
        setbackId: setback?.id,
      }),
    );
    const {success} = result?.payload ?? {};
    isLoading(false);
    if (!success) {
      setTimeout(() => {
        Alert.alert(
          'Setbacks',
          'Unable to issue a setback. Please try again later.',
        );
      }, 200);
    }
  }, [setback]);

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
                -{setback?.starsToDeduct}
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
            {setback?.name}
          </Text>
        </Col>

        <Text
          textAlign="center"
          fontSize={15}
          lineHeight={26}
          fontWeight="400"
          color={COLORS.Text.grey}>
          This action will deduct {setback?.starsToDeduct} stars from{' '}
          {childName}. Are you sure you want to proceed with this action?
        </Text>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressDeductStarButton}
          title={`Deduct ${setback?.starsToDeduct} Stars`}
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
