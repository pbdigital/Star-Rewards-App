import React from 'react';
import {Image} from '../Image';
import {Images} from 'Assets/Images';

const CloudImage = ({...props}) => {
  return <Image source={Images.IcCloud} height={40} width={60} {...props} />;
};

export {CloudImage};
