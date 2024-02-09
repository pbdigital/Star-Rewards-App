import React from 'react';
import {Image} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {Button, Text} from '../..';
import {AlertContainer, CloseIconButton} from './styles';

const AddTaskChildNoTasksModal = ({isVisible, onClose, onPressContinue}) => {
  const handleOnCloseModal = () => {
    doHapticFeedback();
    if (onClose) onClose();
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
        <Text
          fontSize={24}
          fontWeight="600"
          lineHeight={36}
          marginTop={8}
          marginBottom={8}
          textAlign="center"
          color={COLORS.Text.black}>
          No Task Found
        </Text>

        <Text
          fontSize={16}
          fontWeight="400"
          lineHeight={28}
          textAlign="center"
          color={COLORS.Text.grey}>
          The selected child does not have any available tasks to copy.
        </Text>

        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnCloseModal}
          title="Continue"
          buttonTitleFontSize={16}
          marginTop={30}
        />
      </AlertContainer>
    </Modal>
  );
};

export {AddTaskChildNoTasksModal};
