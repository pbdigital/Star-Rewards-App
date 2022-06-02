import React from 'react';
import {TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../../Constants/Colors';
import {AlertContainer, CloseIconButton} from './styles';
import {Images} from '../../Assets/Images';
import {Image} from '../Image';
import {BlurView} from '@react-native-community/blur';

const AppAlertModal = ({isVisible, onClose, children}) => {
  return (
    <Modal
      customBackdrop={
        <TouchableOpacity onPress={onClose} style={{flex: 1}}>
          <BlurView
            style={{flex: 1, backgroundColor: 'rgb(44, 42, 77)'}}
            blurType="light"
            blurAmount={50}
            overlayColor="transparent"
          />
        </TouchableOpacity>
      }
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <AlertContainer>
        <CloseIconButton onPress={onClose}>
          <Image
            source={Images.IcClose}
            width={16}
            height={16}
            tintColor={COLORS.Text.lightGrey}
          />
        </CloseIconButton>
        {children}
      </AlertContainer>
    </Modal>
  );
};

export {AppAlertModal};
