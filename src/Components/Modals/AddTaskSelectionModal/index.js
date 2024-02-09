import React, {useCallback, useEffect, useState} from 'react';
import {Image} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {doHapticFeedback} from 'Helpers';
import {Button, Text} from '../..';
import {
  AlertContainer,
  CloseIconButton,
  AddTaskSelectorItemContainer,
  AddTaskBullet,
} from './styles';

export const TASK_ITEMS = {
  Copy: 'Copy',
  CreateNew: 'CreateNew',
};

const AddTaskSelectorItem = ({
  onPress,
  isSelected,
  label,
  contentContainerStyle,
  type,
}) => {
  console.log({type, isSelected});
  const handleOnPress = useCallback(() => {
    doHapticFeedback();
    if (onPress) {
      onPress(type);
    }
  }, [type, onPress]);

  return (
    <AddTaskSelectorItemContainer
      style={[contentContainerStyle ?? {}]}
      onPress={handleOnPress}>
      {!isSelected ? (
        <AddTaskBullet />
      ) : (
        <Image source={Images.IcRadioButtonSelected} width={24} height={24} />
      )}
      <Text
        fontSize={16}
        fontWeight="400"
        lineHeight={24}
        marginLeft={12}
        textAlign="center"
        color={COLORS.Text.grey}>
        {label}
      </Text>
    </AddTaskSelectorItemContainer>
  );
};

const AddTaskSelectionModal = ({isVisible, onClose, onPressContinue}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(TASK_ITEMS.CreateNew);

  const handleOnCloseModal = () => {
    doHapticFeedback();
    if (onClose) onClose();
    setSelected(TASK_ITEMS.CreateNew);
  };

  const handleOnPressContinueButton = () => {
    doHapticFeedback();
    if (onClose) onClose();
    if (onPressContinue) {
      onPressContinue(selected);
    }
    setTimeout(() => {
      setSelected(TASK_ITEMS.CreateNew);
    }, 300);
  };

  const handleOnItemPress = selectedItem => setSelected(selectedItem);

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
          marginTop={6}
          marginBottom={30}
          textAlign="center"
          color={COLORS.Text.black}>
          Add Task
        </Text>

        <AddTaskSelectorItem
          isSelected={selected === TASK_ITEMS.CreateNew}
          label="Create New"
          contentContainerStyle={{marginBottom: 4}}
          onPress={handleOnItemPress}
          type={TASK_ITEMS.CreateNew}
        />
        <AddTaskSelectorItem
          isSelected={selected === TASK_ITEMS.Copy}
          label="Copy from other child"
          onPress={handleOnItemPress}
          type={TASK_ITEMS.Copy}
        />

        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressContinueButton}
          title="Continue"
          buttonTitleFontSize={16}
          disabled={isLoading}
          isLoading={isLoading}
          marginTop={30}
        />
      </AlertContainer>
    </Modal>
  );
};

export {AddTaskSelectionModal};
