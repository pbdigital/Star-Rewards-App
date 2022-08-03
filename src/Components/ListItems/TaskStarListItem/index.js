import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Alert, Animated, Easing, Vibration, View} from 'react-native';
import {Text} from '../../Text';
import {Images} from 'Assets/Images';
import {COLORS} from 'Constants';
import {Container, Star} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  childActions,
  childIdSelector,
  toolbarStarPositionSelector,
  layoutActions,
} from 'Redux';
import {STAR_POSITIONS} from 'Constants';
import moment from 'moment';
import {Default} from 'Constants';
import * as Animatable from 'react-native-animatable';
import {getTaskPercentageCompleted, playSound} from 'Helpers';
import SoundPlayer from 'react-native-sound-player';

SoundPlayer.addEventListener('FinishedPlaying', ({success}) => {});
const containerPaddnigLeft = (Default.Dimensions.Width - 285) / 2;
const toolbarHeight = 76;

const TaskStarListItem = ({
  contentContainerStyle,
  task,
  onTaskCompleted,
  indexPosition,
  listContainerLayout,
}) => {
  const {name, id: taskId, isBonusTask, starsAwarded} = task;
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const toolbarStarPosition = useSelector(toolbarStarPositionSelector);
  const refStar = useRef(null);

  const starPositionTransform = STAR_POSITIONS[indexPosition].transform;
  const initValAnimatedXvalue = starPositionTransform
    ? starPositionTransform[0].translateX
    : 0;
  const initValAnimatedYvalue = starPositionTransform
    ? starPositionTransform[1].translateY
    : 0;

  const animatedXvalue = useRef(
    new Animated.Value(initValAnimatedXvalue),
  ).current;
  const animatedYvalue = useRef(
    new Animated.Value(initValAnimatedYvalue),
  ).current;
  const animatedWidth = useRef(new Animated.Value(1)).current;
  const animatedHeight = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [itemLayout, setItemLayout] = useState();

  useEffect(() => {
    startFadeAnimation();
  }, [opacity, startFadeAnimation]);

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
    const toolbarStarCenterPointPosition = toolbarStarPosition.x + 15;
    const itemCenterPointPosition =
      containerPaddnigLeft + itemLayout.x + itemLayout.width / 2;

    refStar.current?.wobble(250).then(() => {
      Animated.parallel([
        Animated.timing(animatedYvalue, {
          toValue: -(listContainerLayout.y + toolbarHeight + itemLayout.y + 200),
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedXvalue, {
          toValue: toolbarStarCenterPointPosition - itemCenterPointPosition,
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
        dispatch(layoutActions.setToolBarStarAddedFlag());
      }, 500);
    });
  }, [
    listContainerLayout,
    itemLayout,
    toolbarStarPosition,
    animatedHeight,
    animatedWidth,
    animatedXvalue,
    animatedYvalue,
    refStar,
    dispatch,
    startFadeAnimation,
  ]);

  const retreiveChildTasks = useCallback(async () => {
    if (childId) {
      const payload = {
        childId,
        time: moment().format(),
      };
      const {payload: resPayload} = await dispatch(
        childActions.getChildTasks(payload),
      );
      const {success, tasks} = resPayload;
      if (success && !isBonusTask) {
        const percentage = getTaskPercentageCompleted({tasks, date: moment()});
        dispatch(childActions.setCongratulateTaskCompleted(percentage === 100));
      }
    }
  }, [isBonusTask, childId, dispatch]);

  const completeTask = async () => {
    Vibration.vibrate();
    playSound('star_reward_sound', 'mp3');
    startAnimation();
    const payload = {
      childId,
      taskId,
      date: moment().format('YYYY-MM-DD'),
    };

    const {payload: resPayload} = await dispatch(
      childActions.completeChildTask(payload),
    );

    if (resPayload?.success) {
      setTimeout(async () => {
        await retreiveChildTasks();
        if (onTaskCompleted) {
          onTaskCompleted(task);
        }
      }, 10);
    } else {
      Alert.alert(
        'Unable to complete a task as of the moment. Please try again later.',
      );
    }

    await dispatch(childActions.getAllChildren());
  };

  const handleOnLayout = ({nativeEvent}) => {
    const {layout} = nativeEvent;
    setItemLayout(layout);
  };

  return (
    <Animated.View
      style={[
        styles.absolute,
        STAR_POSITIONS[indexPosition],
        {
          transform: [
            {translateY: animatedYvalue},
            {translateX: animatedXvalue},
            {scaleX: animatedWidth},
            {scaleY: animatedHeight},
          ],
          opacity,
        },
      ]}
      onLayout={handleOnLayout}>
      <Animatable.View ref={refStar}>
        <Container onLongPress={completeTask} delayLongPress={250}>
          <Star source={Images.Star} resizeMode="cover">
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
                {name}
              </Text>
              {isBonusTask && starsAwarded && (
                <Text
                  style={[styles.label]}
                  fontSize={11}
                  fontWeight="bold"
                  lineHeight={16}
                  textAlign="center"
                  numberOfLines={1}
                  color={COLORS.Gold}>
                  {`x ${starsAwarded}`}
                </Text>
              )}
            </View>
          </Star>
        </Container>
      </Animatable.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  label: {
    maxWidth: 60,
  },
});

export {TaskStarListItem};
