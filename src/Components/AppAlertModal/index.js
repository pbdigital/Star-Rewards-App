import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, Platform} from 'react-native';
import {COLORS} from 'Constants';
import {AlertContainer, CloseIconButton} from './styles';
import {Images} from 'Assets/Images';
import {Image} from '../Image';
import {BlurView} from '@react-native-community/blur';
import {doHapticFeedback} from 'Helpers';

const AppAlertModal = ({isVisible, onClose, children}) => {
  const handleOnPressCloseButton = () => {
    doHapticFeedback();
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }
  return (
    <TouchableOpacity onPress={handleOnPressCloseButton} style={styles.root}>
      <BlurView
        style={[styles.blur, Platform.OS === 'ios' && styles.blurIos]}
        blurType="dark"
        blurAmount={1}
        reducedTransparencyFallbackColor="white">
        <AlertContainer>
          <CloseIconButton onPress={handleOnPressCloseButton}>
            <Image
              source={Images.IcClose}
              width={16}
              height={16}
              tintColor={COLORS.Text.lightGrey}
            />
          </CloseIconButton>
          {children}
        </AlertContainer>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurIos: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(44, 42, 77, 0.6)',
  },
});

export {AppAlertModal};
