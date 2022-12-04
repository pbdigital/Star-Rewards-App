/* eslint-disable react-native/no-inline-styles */
import React, {
  useImperativeHandle,
  forwardRef,
  useMemo,
  useCallback,
} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import * as d3Shape from 'd3-shape';

import Svg, {G, Text, Path} from 'react-native-svg';
import {COLORS} from 'Constants';
import {Images} from 'src/Assets/Images';
import {Image} from '../Image';
import {WHEEL_DIMEN, SPIN_DURATION} from 'src/Constants/SpinWheel';
import {useSelector} from 'react-redux';
import {childStarsSelector, childRewardsSelector} from 'Redux';
import {playSound} from 'Helpers';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const width = 340;
const oneTurn = 360;

const WheelOfFortune = forwardRef(({onWinReward}, ref) => {
  useImperativeHandle(ref, () => ({
    spinWheel: spinWheel,
  }));

  const childRewards = useSelector(childRewardsSelector);
  const childStarsCount = useSelector(childStarsSelector);
  const eligibleRewards = useMemo(() => {
    if (childRewards?.length) {
      return childRewards.filter(
        ({starsNeededToUnlock}) =>
          parseInt(starsNeededToUnlock, 10) <= childStarsCount,
      );
    }
    return [];
  }, [childRewards, childStarsCount]);
  const rewards = useMemo(() => {
    if (eligibleRewards?.length) {
      return eligibleRewards.map((_, index) => `Reward ${index + 1}`);
    }
    return [];
  }, [eligibleRewards]);

  const _angle = useMemo(() => new Animated.Value(0), []);
  const numberOfSegments = useMemo(() => rewards.length, [rewards]);
  const angleBySegment = useMemo(() => oneTurn / rewards?.length, [rewards]);
  const angleOffset = useMemo(() => angleBySegment / 2, [angleBySegment]);
  const wheelPaths = useMemo(() => {
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

  const getWinner = useCallback(
    (value, index) => {
      if (eligibleRewards?.length) {
        if (onWinReward) {
          console.log({value, index});
          onWinReward(eligibleRewards[index]);
        }
        setTimeout(() => playSound('award_reward_sound', 'mp3'), 500);
      }
    },
    [eligibleRewards, onWinReward],
  );

  const spinWheel = useCallback(() => {
    _angle.setValue(0);
    const duration = SPIN_DURATION;
    const winner = Math.floor(Math.random() * numberOfSegments);
    const toValue =
      365 - winner * (oneTurn / numberOfSegments) + 360 * (duration / 1000);
    Animated.timing(_angle, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      const winnerIndex = winner;
      getWinner(wheelPaths[winnerIndex].value, winnerIndex);
    });
  }, [_angle, numberOfSegments, wheelPaths, getWinner]);

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
                rotate: _angle.interpolate({
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
            opacity: 1,
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
                const [x, y] = arc.centroid;
                const number = arc.value.toString();
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
  }, [_angle, _textRender, numberOfSegments, angleOffset, wheelPaths]);

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
});

export {WheelOfFortune};

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
