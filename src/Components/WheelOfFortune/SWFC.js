/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import * as d3Shape from 'd3-shape';

import Svg, {G, Text, Path} from 'react-native-svg';
import {COLORS} from 'Constants';
import {Images} from 'src/Assets/Images';
import {Image} from '../Image';
import {WHEEL_DIMEN} from 'src/Constants/SpinWheel';
import {useEffect, useState, useRef} from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { number } from 'prop-types';
import { childRewardsSelector } from 'Redux';
import { useSelector } from 'react-redux';
import { childStarsSelector } from 'Redux';
import { playSound } from 'Helpers';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const {height} = Dimensions.get('screen');

const width = 340;

const fontSize = 14;
const oneTurn = 360;

const WheelOfFortuneFC = () => {
  const wheelRef = useRef(null);
  const childRewards = useSelector(childRewardsSelector);
  const childStarsCount = useSelector(childStarsSelector);
  const [enabled, setEnabled] = useState(false);
  const [wheelOpacity, setWheelOpacity] = useState(new Animated.Value(1));

  const [angle, setAngle] = useState(new Animated.Value(0));
  const rewards = useMemo(() => {
    if (childRewards?.length) {
      return childRewards
        .filter(
          ({starsNeededToUnlock}) =>
            parseInt(starsNeededToUnlock, 10) <= childStarsCount,
        )
        .map((_, index) => `Reward ${index + 1}`);
    }
    return [];
  }, [childRewards, childStarsCount]);

  const numberOfSegments = useMemo(() => rewards.length, [rewards]);
  const angleBySegment = useMemo(() => oneTurn / rewards?.length, [rewards]);
  const angleOffset = useMemo(() => angleBySegment / 2, [angleBySegment]);
  const wheelPaths = useMemo(() => {
    console.log({numberOfSegments})
    const data = Array.from({length: numberOfSegments}).fill(1);
    const arcs = d3Shape.pie()(data);
    var colors = COLORS.wheelItemColors;
    return arcs.map((arc, index) => {
      const instance = d3Shape
        .arc()
        .padAngle(0.01)
        .outerRadius(width / 2)
        .innerRadius(24);
      return {
        path: instance(arc),
        color: colors[index % colors.length],
        value: rewards[index],
        centroid: instance.centroid(arc),
      };
    });
  }, [rewards, numberOfSegments]);

  const [winner, setWinner] = useState(
    () => Math.floor(Math.random() * numberOfSegments),
    [numberOfSegments],
  );

  const getWinner = useCallback(
    (value, index) => {
      if (rewards) {
        setWinner(rewards[index]);
        setTimeout(() => playSound('award_reward_sound', 'mp3'), 500);
      }
    },
    [rewards],
  );

  useEffect(() => {
    resetWheelState();
    angleListener();
  }, [rewards]);

  const resetWheelState = () => {
    setEnabled(false);
    setWinner(null);
    setWheelOpacity(new Animated.Value(1));
  };

  const _tryAgain = useCallback(() => {
    resetWheelState();
    angleListener();
    _onPress();
  }, [angleListener, _onPress]);

  const angleListener = useCallback(() => {
    angle.addListener(event => {
      if (enabled) {
        setEnabled(false);
      }
      setAngle(event.value);
    });
  }, [angle, enabled]);

  const _getWinnerIndex = useCallback(() => {
    const deg = Math.abs(Math.round(angle % oneTurn));
    // wheel turning counterclockwise
    if (angle < 0) {
      return Math.floor(deg / angleBySegment);
    }
    // wheel turning clockwise
    return (
      (numberOfSegments - Math.floor(deg / angleBySegment)) % numberOfSegments
    );
  }, [numberOfSegments, angleBySegment, angle]);

  const _onPress = useCallback(() => {
    const duration = 5000;
    Animated.timing(angle, {
      toValue:
        365 - winner * (oneTurn / numberOfSegments) + 360 * (duration / 1000),
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      const winnerIndex = _getWinnerIndex();
      setWinner(wheelPaths[winnerIndex].value);
      getWinner(wheelPaths[winnerIndex].value, winnerIndex);
    });
  }, [angle, winner, numberOfSegments, wheelPaths, _getWinnerIndex, getWinner]);

  const _textRender = useCallback(
    (x, y, number, i) => (
      <Text
        x={x}
        y={y}
        fill={COLORS.White}
        textAnchor="middle"
        transform={`rotate(0 ${x} ${y})`}
        fontWeight="500"
        fontSize={14}>
        {number}
      </Text>
    ),
    [],
  );

  const _renderSvgWheel = useMemo(() => {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
              {
                rotate: angle.interpolate({
                  inputRange: [-oneTurn, 0, oneTurn],
                  outputRange: [`-${oneTurn}deg`, '0deg', `${oneTurn}deg`],
                }),
              },
            ],
            backgroundColor: COLORS.White,
            width: WHEEL_DIMEN,
            height: WHEEL_DIMEN,
            borderRadius: (width - 20) / 2,
            borderWidth: 10,
            borderColor: '#F8D879',
            opacity: wheelOpacity,
          }}>
          <AnimatedSvg
            width={WHEEL_DIMEN - 20}
            height={WHEEL_DIMEN - 20}
            viewBox={`0 0 ${width} ${width}`}
            style={{
              transform: [{rotate: `-${angleOffset}deg`}],
              margin: 10,
            }}>
            <G y={width / 2} x={width / 2}>
              {wheelPaths.map((arc, i) => {
                console.log(angleOffset)
                const [x, y] = arc.centroid;
                const number = arc.value.toString();
                console.log({number});

                return (
                  <G key={`arc-${i}`}>
                    <Path
                      d={arc.path}
                      strokeWidth={2}
                      // stroke={COLORS.White}
                      fill={arc.color}
                    />
                    <G
                      rotation={(i * oneTurn) / numberOfSegments + angleOffset}
                      origin={`${x}, ${y}`}
                      transform={`rotate(-90 ${x} ${y - 6})`}>
                      {_textRender(x, y, number, i)}
                    </G>
                  </G>
                );
              })}
            </G>
          </AnimatedSvg>
        </Animated.View>
      </View>
    );
  }, [
    angle,
    _textRender,
    numberOfSegments,
    angleOffset,
    wheelPaths,
    wheelOpacity,
  ]);

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View style={styles.content}>
          {_renderSvgWheel}
          <Image
            source={Images.SpinnerArrow}
            width={50}
            height={59}
            style={{
              position: 'absolute',
              top: WHEEL_DIMEN / 2 - 30,
              left: WHEEL_DIMEN / 2 - 25,
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
}

export {WheelOfFortuneFC};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {},
  startText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
