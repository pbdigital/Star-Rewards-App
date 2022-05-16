import React from 'react';
import {Platform} from 'react-native';
import {CloudBackground1} from './CloudBackgrounds/CloudBackground1';
import {Content, Root} from './styles';

const KAV_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

const ScreenBackground = ({children}) => {
  return (
    <Root behavior={KAV_BEHAVIOR}>
      <Content>{children}</Content>
      <CloudBackground1 />
    </Root>
  );
};

export {ScreenBackground};
