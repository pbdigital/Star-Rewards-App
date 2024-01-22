import React, {useCallback, useMemo, useState} from 'react';
import {Alert, Image} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {Button, Text} from '../..';
import {useDispatch, useSelector} from 'react-redux';
import {childActions, childIdSelector, childNameSelector} from '../../../Redux';
import {toLower} from 'lodash';
import {
  AlertContainer,
  Col,
  CloseIconButton,
  BonusStarInfo,
  Row,
} from './styles';

const DeductPointsModal = ({isVisible, onClose, setback}) => {
  const dispatch = useDispatch();
  const childName = useSelector(childNameSelector);
  const childId = useSelector(childIdSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeducted, setIsDeducted] = useState(false);
  const lblStar = useMemo(() => {
    return setback?.starsToDeduct == 1 ? 'Star' : 'Stars';
  }, [setback]);
  const note = useMemo(() => {
    if (isDeducted) {
      return `${setback?.starsToDeduct} stars have been deducted from ${childName}’s star balance.`;
    }
    return `This action will deduct ${setback?.starsToDeduct} ${toLower(
      lblStar,
    )} from ${childName}. Are you sure you want to proceed with this action?`;
  }, [childName, isDeducted, setback, lblStar]);

  const handleOnCloseModal = () => {
    doHapticFeedback();
    setIsDeducted(false);
    if (onClose) {
      onClose();
    }
  };

  const handleOnPressDeductStarButton = useCallback(async () => {
    setIsLoading(true);
    const result = await dispatch(
      childActions.issueChildSetback({
        childId,
        setbackId: setback?.id,
      }),
    );
    const {success} = result?.payload ?? {};
    setIsLoading(false);
    if (!success) {
      setIsDeducted(false);
      setTimeout(() => {
        Alert.alert(
          'Setbacks',
          'Unable to issue a setback. Please try again later.',
        );
      }, 200);
    } else {
      setIsDeducted(true);
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
            <Text
              fontSize={40}
              fontWeight="600"
              lineHeight={48}
              marginLeft={16}
              marginRight={20}
              color={COLORS.Text.black}>
              {setback?.emoji}
            </Text>
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
          {note}
        </Text>
        {!isDeducted && (
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Green}
            shadowColor={COLORS.GreenShadow}
            onPress={handleOnPressDeductStarButton}
            title={`Deduct ${setback?.starsToDeduct} ${lblStar}`}
            buttonTitleFontSize={16}
            disabled={isLoading}
            isLoading={isLoading}
            marginTop={23}
          />
        )}
      </AlertContainer>
    </Modal>
  );
};

export {DeductPointsModal};
