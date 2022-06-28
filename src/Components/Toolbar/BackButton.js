import React from 'react';
import {Image} from '../Image';
import {BackButtonContainer} from './styles';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../Assets/Images';
import {doHapticFeedback} from '../../Helpers/TaskUtil';

const BackButton = ({onPress}) => {
  const navigation = useNavigation();
  const handleOnPressBackButton = () => {
    doHapticFeedback();
    if (onPress) {
      onPress();
      return;
    }

    if (navigation.canGoBack) {
      navigation.goBack();
    }
  };

  return (
    <BackButtonContainer onPress={handleOnPressBackButton}>
      <Image source={Images.IcBack} width={18} height={14} />
    </BackButtonContainer>
  );
};

export {BackButton};
