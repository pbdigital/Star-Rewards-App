import React from 'react';
import {Images} from '../../Assets/Images';
import {Image} from '../Image';
import {Settings} from './styles';

const SettingsButton = ({onPress}) => {
  return (
    <Settings onPress={onPress}>
      <Image source={Images.IcSettings} width={24} height={24} />
    </Settings>
  );
};

export {SettingsButton};
