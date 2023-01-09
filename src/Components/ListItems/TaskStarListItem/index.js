import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {
  StyleSheet,
  Alert,
  Animated,
  Easing,
  Vibration,
  View,
} from 'react-native';
import {Text} from '../../Text';
import {Image} from '../../Image';
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
import {playSound} from 'Helpers';
import SoundPlayer from 'react-native-sound-player';
import {selectedDateToShowTaskSelector} from 'Redux';

SoundPlayer.addEventListener('FinishedPlaying', ({success}) => {});
const containerPaddnigLeft = (Default.Dimensions.Width - 285) / 2;
const toolbarHeight = 76;

const TaskStarListItem = ({
  onTaskCompleted,
  task,
  indexPosition,
  listContainerLayout,
}) => {
  const {name, id: taskId, isBonusTask, starsAwarded} = task;
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const selectedDateToShowTask = useSelector(selectedDateToShowTaskSelector);
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
  const [starButtonDisabled, setStarButtonDisabled] = useState(false);
  const isCompletedForToday = useMemo(() => {
    const dayFilter = moment(selectedDateToShowTask, 'MM-DD-YYYY').format('YYYY-MM-DD');
    return task?.daysCompleted?.includes(dayFilter);
  }, [task, selectedDateToShowTask]);
  const [showCompleteIndicator, setShowCompleteIndicator] = useState(false);

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
        setShowCompleteIndicator(true);
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

  const completeTask = useCallback(async () => {
    if (isCompletedForToday) return;
    setStarButtonDisabled(true);
    Vibration.vibrate();
    playSound('star_reward_sound', 'mp3');
    startAnimation();

    let date;
    const dateFormat = 'YYYY-MM-DD';
    if (typeof selectedDateToShowTask === 'string') {
      date = moment(selectedDateToShowTask, 'MM-DD-YYYY').format(dateFormat);
    } else {
      date = moment().format();
    }

    const payload = {
      childId,
      taskId,
      date,
    };

    const {payload: resPayload} = await dispatch(
      childActions.completeChildTask(payload),
    );

    setStarButtonDisabled(false);
    if (resPayload?.success) {
      setTimeout(async () => {
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
  }, [selectedDateToShowTask, startAnimation, isCompletedForToday]);

  const handleOnLayout = ({nativeEvent}) => {
    const {layout} = nativeEvent;
    setItemLayout(layout);
  };

  const renderDummyStar = () => (
    <View
      style={[styles.absolute, STAR_POSITIONS[indexPosition]]}
      onLayout={handleOnLayout}>
      <View>
        <Container
          onLongPress={completeTask}
          delayLongPress={250}
          disabled={starButtonDisabled}>
          {showCompleteIndicator && (
            <Image
              source={Images.IcComplete}
              width={24}
              height={24}
              style={[styles.completeBadge]}
            />
          )}
          <Star source={Images.Star} resizeMode="cover" style={{opacity: 0.3}}>
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
      </View>
    </View>
  );

  return (
    <>
      {renderDummyStar()}
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
          <Container
            onLongPress={completeTask}
            delayLongPress={250}
            disabled={starButtonDisabled}>
            {isCompletedForToday && (
              <Image
                source={Images.IcComplete}
                width={24}
                height={24}
                style={styles.completeBadge}
              />
            )}
            <Star
              source={Images.Star}
              resizeMode="cover"
              style={{opacity: isCompletedForToday ? 0.3 : 1}}>
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
    </>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  label: {
    maxWidth: 60,
  },
  completeBadge: {
    position: 'absolute',
    right: 20,
    top: 16,
    opacity: 1,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
});

export {TaskStarListItem};
