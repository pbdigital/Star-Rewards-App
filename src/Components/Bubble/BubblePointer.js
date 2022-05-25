/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {COLORS} from '../../Constants/Colors';

const BubblePointer = ({marginTop, style}) => {
  return (
    <View
      style={[
        {
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: 30,
          borderRightWidth: 30,
          borderBottomWidth: 43,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: COLORS.White,
          transform: [{rotate: '180deg'}],
          marginTop: marginTop ? marginTop : 0,
          marginLeft: -6,
          borderWidth: 0,
          borderColor: COLORS.White,
        },
        style || {},
      ]}
    />
  );
};

export {BubblePointer};
