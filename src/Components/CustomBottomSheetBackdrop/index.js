import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';

const CustomBottomSheetBackdrop = ({animatedIndex, style}) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'rgba(44, 42, 77, 0.8)',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return (
    <TouchableOpacity style={style}>
      <Animated.View style={containerStyle}>
        <BlurView
          style={[style]}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export {CustomBottomSheetBackdrop};
