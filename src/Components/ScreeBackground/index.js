import React, {useMemo} from 'react';
import {Platform} from 'react-native';
import {CloudBackground1} from './CloudBackgrounds/CloudBackground1';
import {CloudBackground2} from './CloudBackgrounds/CloudBackground2';
import {Content, Root} from './styles';

const KAV_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

const ScreenBackground = ({children, cloudType = 1}) => {
  const renderCloudBackground = useMemo(() => {
    switch (cloudType) {
      case 2:
        return <CloudBackground2 />;
      case 1:
      default:
        return <CloudBackground1 />;
    }
  }, [cloudType]);
  return (
    <Root behavior={KAV_BEHAVIOR}>
      <Content>{children}</Content>
      {renderCloudBackground}
    </Root>
  );
};

export {ScreenBackground};
