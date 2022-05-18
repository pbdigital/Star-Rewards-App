import React from 'react';
import {CloudBackgroundRightOverLeft} from './Clouds/CloudBackgroundRightOverLeft';
import {CloudImage} from '../../CloudImage';
import {
  TopCloud,
  BottomCloud,
  BottomCloudImageLeft,
  BottomCloudImageRight,
} from './styles';

const CloudBackground1 = () => {
  return (
    <>
      <TopCloud>
        <CloudBackgroundRightOverLeft />
      </TopCloud>
      <BottomCloud>
        <BottomCloudImageRight>
          <CloudImage />
        </BottomCloudImageRight>
        <BottomCloudImageLeft>
          <CloudImage />
        </BottomCloudImageLeft>
      </BottomCloud>
    </>
  );
};

export {CloudBackground1};
