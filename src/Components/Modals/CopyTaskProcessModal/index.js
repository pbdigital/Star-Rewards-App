import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';
import Modal from 'react-native-modal';
import ConfettiCannon from 'react-native-confetti-cannon';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {Button, Image, Text} from '../..';
import {noop} from 'lodash';
import {
  ImageContainer,
  AlertContainer,
  CloseIconButton,
  HoldContentContainer,
  ConfettiContainer,
} from './styles';

const HoldOnContent = () => {
  return (
    <View>
      <ImageContainer>
        <Image source={Images.StarryCopyHoldOn} width={100} height={103} />
      </ImageContainer>
      <HoldContentContainer>
        <ImageContainer>
          <Image
            source={Images.EllipsisColored}
            width={40}
            height={12}
            resizeMode="contain"
          />
        </ImageContainer>
        <Text
          fontSize={24}
          fontWeight="600"
          lineHeight={36}
          marginTop={8}
          marginBottom={8}
          textAlign="center"
          color={COLORS.Text.black}>
          Hold on!
        </Text>

        <Text
          fontSize={16}
          fontWeight="400"
          lineHeight={28}
          textAlign="center"
          color={COLORS.Text.grey}>
          We're setting up your child's new challenges. Hang tight while we prepare the excitement!
        </Text>
      </HoldContentContainer>
    </View>
  );
};

const CongratulationsContent = ({onClose}) => {
  return (
    <View>
      <CloseIconButton onPress={onClose}>
        <Image
          source={Images.IcClose}
          width={16}
          height={16}
          tintColor={COLORS.Text.lightGrey}
        />
      </CloseIconButton>

      <ImageContainer>
        <Image source={Images.StarryCopySuccess} width={129} height={148} />
      </ImageContainer>

      <Text
        fontSize={24}
        fontWeight="600"
        lineHeight={36}
        marginTop={30}
        marginBottom={8}
        textAlign="center"
        color={COLORS.Text.black}>
        Great job!
      </Text>

      <Text
        fontSize={16}
        fontWeight="400"
        lineHeight={28}
        textAlign="center"
        marginBottom={30}
        color={COLORS.Text.grey}>
        Your item has been added successfully. Watch as your child conquers this new challenge
      </Text>

      <Button
        borderRadius={16}
        titleColor={COLORS.White}
        buttonColor={COLORS.Green}
        shadowColor={COLORS.GreenShadow}
        onPress={onClose}
        title="Start Now"
        buttonTitleFontSize={16}
      />
    </View>
  );
};

const CopyTaskProcessModal = ({isVisible, onClose, isSuccess}) => {
  const [showCongratulationContent, setShowCongratulationContent] =
    useState(false);
  const handleOnCloseModal = () => {
    doHapticFeedback();
    if (onClose) onClose();
  };
  const refConfetti = useRef(null);

  useEffect(() => {
    if (!isSuccess) return;
    setTimeout(() => {
      setShowCongratulationContent(true);
    }, 2000);
  }, [isSuccess]);

  useEffect(() => {
    if (showCongratulationContent && isVisible) {
      refConfetti?.current.start();
    }
  }, [isVisible, showCongratulationContent]);

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={showCongratulationContent ? handleOnCloseModal : noop}>
      <AlertContainer>
        {showCongratulationContent ? (
          <CongratulationsContent onClose={handleOnCloseModal} />
        ) : (
          <HoldOnContent />
        )}
      </AlertContainer>
      <ConfettiContainer>
        <ConfettiCannon
          count={50}
          origin={{x: Dimensions.get('screen').width / 2, y: -20}}
          fadeOut={true}
          autoStart={false}
          ref={refConfetti}
        />
      </ConfettiContainer>
    </Modal>
  );
};

export {CopyTaskProcessModal};
