/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {TutorialContainer} from './TutorialContainer';
import {COLORS} from 'Constants';
import {EmptyListState} from '../EmptyListState';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';
import {styles} from './styles';
import {Text} from '../Text';
import * as Animatable from 'react-native-animatable';

const TapAndHold = forwardRef(({onDemoFinished}, ref) => {
  const refStar = useRef(null);
  const message =
    'Simply tap and hold on a\ntask to mark it as complete.\nWatch the stars twinkle as your\nchild conquers each mission!';

  const opacity = useRef(new Animated.Value(1)).current;
  const animatedXvalue = useRef(new Animated.Value(0)).current;
  const animatedYvalue = useRef(new Animated.Value(0)).current;
  const animatedWidth = useRef(new Animated.Value(1)).current;
  const animatedHeight = useRef(new Animated.Value(1)).current;

  const resetStarPosition = () => {
    animatedXvalue.setValue(0);
    animatedYvalue.setValue(0);
    animatedHeight.setValue(1);
    animatedWidth.setValue(1);
    opacity.setValue(1);
  };

  useImperativeHandle(ref, () => ({
    resetStarPosition: resetStarPosition,
  }));

  const startFadeAnimation = useCallback(
    (duration = 500, value = 1) => {
      Animated.timing(opacity, {
        toValue: value,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    },
    [opacity],
  );

  const startAnimation = useCallback(() => {
    refStar.current?.wobble(250).then(() => {
      Animated.parallel([
        Animated.timing(animatedYvalue, {
          toValue: -200,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedXvalue, {
          toValue: 200,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedWidth, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();

      startFadeAnimation(400, 0);
      setTimeout(() => {
        onDemoFinished();
      }, 500);
    });
  }, [refStar, onDemoFinished]);

  const demoContent = (
    <View style={styles.demoContainer}>
      <Animated.View
        style={{
          transform: [
            {translateY: animatedYvalue},
            {translateX: animatedXvalue},
            {scaleX: animatedWidth},
            {scaleY: animatedHeight},
          ],
          opacity,
        }}>
        <Animatable.View ref={refStar}>
          <TouchableOpacity onLongPress={startAnimation}>
            <ImageBackground
              source={Images.Star}
              resizeMode="cover"
              style={styles.tabHoldStar}>
              <View>
                <Text
                  style={styles.label}
                  fontSize={11}
                  fontWeight="500"
                  lineHeight={16}
                  textAlign="center"
                  marginTop={10}
                  numberOfLines={2}
                  color={COLORS.Gold}>
                  Brush teeth
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </Animatable.View>
      </Animated.View>
    </View>
  );

  return (
    <TutorialContainer
      title="Tap & Hold"
      backgroundColor={COLORS.Purple}
      demoContent={demoContent}
      hideLeftNavigationButton
      hideRightNavigationButton>
      <View style={styles.root}>
        <EmptyListState
          message={message}
          starImage={
            <Image source={Images.StarryTutorial2} width={152} height={160} />
          }
          hideCloudLeft
          hideCloudRight
          messageStyle={styles.message}
        />
      </View>
    </TutorialContainer>
  );
});

export {TapAndHold};
