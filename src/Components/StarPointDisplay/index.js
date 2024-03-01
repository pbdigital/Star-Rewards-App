import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from 'Assets/Images';
import {COLORS, NAV_ROUTES} from 'Constants';
import {
  childStarsSelector,
  toolBarStarAddedFlagSelector,
  layoutActions,
  isReadOnlySelector,
} from 'Redux';
import {useNavigation} from '@react-navigation/native';
import {Text} from '../Text';
import {Points} from './styles';

const StartPointDisplay = ({marginRight}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isReadOnly = useSelector(isReadOnlySelector);
  const selectedChildStar = useSelector(childStarsSelector);
  const hasAddedNewStarPoints = useSelector(toolBarStarAddedFlagSelector);
  const [previousStarPoints, setPreviousStarPoints] = useState(
    hasAddedNewStarPoints,
  );
  const animatedHeight = useRef(new Animated.Value(1)).current;
  const animatedWidth = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    console.log({animatedWidth, animatedHeight});
  }, [animatedWidth, animatedHeight]);

  const startAnimation = useCallback(() => {
    const scaleTo = 1.4;
    const scaleUpAnimation = Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: scaleTo,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedWidth, {
        toValue: scaleTo,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);

    const scaleDownAnimation = Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedWidth, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);

    const pulseAnimation = Animated.sequence([
      scaleUpAnimation,
      scaleDownAnimation,
    ]);

    pulseAnimation.start();
  }, [animatedHeight, animatedWidth]);

  useEffect(() => {
    if (previousStarPoints !== hasAddedNewStarPoints) {
      startAnimation();
      setPreviousStarPoints(hasAddedNewStarPoints);
    }
  }, [
    hasAddedNewStarPoints,
    startAnimation,
    setPreviousStarPoints,
    previousStarPoints,
  ]);

  const handleOnLayout = ({nativeEvent}) => {
    console.log('STAR LAYOUT', {nativeEvent});
    const {layout} = nativeEvent;
    dispatch(layoutActions.setToolbarStarPosition(layout));
  };

  const handleOnPressStarImage = () => {
    navigation.navigate(NAV_ROUTES.starsAdjustmentForm);
  };

  return (
    <Points
      marginRight={marginRight}
      onLayout={handleOnLayout}
      onPress={handleOnPressStarImage}
      disabled={isReadOnly}>
      <Animated.Image
        source={Images.Star}
        style={[
          styles.starImage,
          {
            transform: [{scaleX: animatedWidth}, {scaleY: animatedHeight}],
          },
        ]}
      />
      <Text
        fontSize={20}
        lineHeight={30}
        fontWeight="600"
        textAlign="center"
        color={COLORS.Gold}>
        {selectedChildStar}
      </Text>
    </Points>
  );
};

const styles = StyleSheet.create({
  starImage: {
    width: 30,
    height: 29,
    marginRight: 10,
  },
});

export {StartPointDisplay};
