import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Images} from '../../Assets/Images';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {Image} from '../Image';
import {Settings} from './styles';

const SettingsButton = () => {
  const navigation = useNavigation();

  const handleOnPressSettingsButton = () => {
    navigation.navigate(NAV_ROUTES.settings);
  };

  return (
    <Settings onPress={handleOnPressSettingsButton}>
      <Image source={Images.IcSettings} width={24} height={24} />
    </Settings>
  );
};

export {SettingsButton};
