/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {ACCESS_DENIED_MESSAGE, COLORS} from 'Constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  childActions,
  childIdSelector,
  toolbarStarPositionSelector,
  layoutActions,
  selectedDateToShowTaskSelector,
  isReadOnlySelector,
} from 'AppReduxState';
import {STAR_POSITIONS, Default} from 'Constants';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import {playSound} from 'Helpers';
import SoundPlayer from 'react-native-sound-player';
import {LIST_TYPE} from '../../../Constants';
import {ChildAccessDeniedModal} from 'src/Components/Modals';
import {isCompletingStarsSelector} from '../../../AppReduxState';
import {
  Container,
  Star,
  ListStarViewItemContainer,
  ListStarViewItemMetaContainer,
} from './styles';

SoundPlayer.addEventListener('FinishedPlaying', ({success}) => {});
const containerPaddnigLeft = (Default.Dimensions.Width - 285) / 2;
const toolbarHeight = 76;

const TaskStarListItem = ({
  onTaskCompleted,
  task,
  indexPosition,
  listContainerLayout,
  type: listType,
  starType,
}) => {
  const {name, id: taskId, isBonusTask, starsAwarded} = task;
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const selectedDateToShowTask = useSelector(selectedDateToShowTaskSelector);
  const toolbarStarPosition = useSelector(toolbarStarPositionSelector);
  const isReadOnly = useSelector(isReadOnlySelector);
  const isCompletingStars = useSelector(isCompletingStarsSelector);
  const refStar = useRef(null);

  const starPositionTransform = STAR_POSITIONS[indexPosition]
    ? STAR_POSITIONS[indexPosition].transform
    : 0;
  const initValAnimatedXvalue = starPositionTransform
    ? starPositionTransform[0].translateX
    : 0;
  const initValAnimatedYvalue = starPositionTransform
    ? starPositionTransform[1].translateY
    : 0;

  // List Animation Values
  const animatedYvalueListStar = useRef(new Animated.Value(0)).current;
  const animatedXvalueListStar = useRef(new Animated.Value(0)).current;
  const animatedWidthListStar = useRef(new Animated.Value(1)).current;
  const animatedHeightListStar = useRef(new Animated.Value(1)).current;

  // Star Animation Values
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
  const [isCompletedForToday, setIsCompletedForToday] = useState(false);
  const [showCompleteIndicator, setShowCompleteIndicator] = useState(false);
  const [showIsBonusAccessDeniedModal, setShowIsBonusAccessDeniedModal] =
    useState(false);
  const [showIsStarAccessDeniedModal, setShowIsStarAccessDeniedModal] =
    useState(false);

  useEffect(() => {
    const dayFilter = moment(selectedDateToShowTask, 'MM-DD-YYYY').format(
      'YYYY-MM-DD',
    );
    setIsCompletedForToday(task?.daysCompleted?.includes(dayFilter));
  }, [task, selectedDateToShowTask]);

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
          toValue: -(
            listContainerLayout.y +
            toolbarHeight +
            itemLayout.y +
            200
          ),
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

  const startAnimationForList = useCallback(() => {
    const toolbarStarCenterPointPosition = toolbarStarPosition.x + 15;
    const itemCenterPointPosition =
      containerPaddnigLeft + itemLayout.x + 40 / 2;

    refStar.current?.wobble(250).then(() => {
      Animated.parallel([
        Animated.timing(animatedYvalueListStar, {
          toValue: -(
            listContainerLayout.y +
            toolbarHeight +
            itemLayout.y +
            500
          ),
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedXvalueListStar, {
          toValue: toolbarStarCenterPointPosition + itemCenterPointPosition,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedWidthListStar, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedHeightListStar, {
          toValue: 0,
          duration: 1000,
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
    refStar,
    dispatch,
    animatedYvalueListStar,
    animatedXvalueListStar,
    itemLayout,
    listContainerLayout,
    toolbarStarPosition,
    animatedHeightListStar,
    animatedWidthListStar,
    startFadeAnimation,
  ]);

  const completeTask = useCallback(async () => {
    if (isReadOnly) {
      if (isBonusTask) {
        setShowIsBonusAccessDeniedModal(true);
      } else {
        setShowIsStarAccessDeniedModal(true);
      }
      return;
    }
    if (isCompletedForToday && !isBonusTask) {
      return;
    }
    dispatch(childActions.setIsCompletingStars(true));
    setStarButtonDisabled(true);
    Vibration.vibrate();
    playSound('star_reward_sound', 'mp3');
    if (listType === LIST_TYPE.list) {
      startAnimationForList();
    } else {
      startAnimation();
    }

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
    dispatch(childActions.setIsCompletingStars(false));
    if (resPayload?.success) {
      setIsCompletedForToday(true);
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
  }, [
    isReadOnly,
    selectedDateToShowTask,
    startAnimation,
    isCompletedForToday,
    listType,
  ]);

  const handleOnLayout = ({nativeEvent}) => {
    const {layout} = nativeEvent;
    setItemLayout(layout);
  };

  const closeAccessDeniedModals = () => {
    setShowIsStarAccessDeniedModal(false);
    setShowIsBonusAccessDeniedModal(false);
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
          {showCompleteIndicator && !isBonusTask && (
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
                fontFamily="Poppins-Medium"
                lineHeight={16}
                textAlign="center"
                marginTop={10}
                numberOfLines={3}
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

  const renderItemAsList = () => {
    let listName = name;
    let starImage =
      isCompletedForToday && !isBonusTask
        ? Images.ListStarComplete
        : Images.Star;

    return (
      <ListStarViewItemContainer
        onLongPress={completeTask}
        delayLongPress={250}
        disabled={starButtonDisabled}
        onLayout={handleOnLayout}>
        <ListStarViewItemMetaContainer>
          {showCompleteIndicator ? (
            <Image
              source={isBonusTask ? Images.Star : Images.ListStarComplete}
              width={43}
              height={40}
              resizeMode="contain"
            />
          ) : (
            <Animated.View
              style={[
                {
                  transform: [
                    {translateY: animatedYvalueListStar},
                    {translateX: animatedXvalueListStar},
                    {scaleX: animatedWidthListStar},
                    {scaleY: animatedHeightListStar},
                  ],
                  opacity,
                },
              ]}>
              <Animatable.View ref={refStar}>
                <Image
                  source={starImage}
                  width={43}
                  height={40}
                  resizeMode="contain"
                />
              </Animatable.View>
            </Animated.View>
          )}
          <Text
            fontSize={15}
            fontWeight="400"
            lineHeight={22}
            textAlign="left"
            marginLeft={16}
            style={{flex: 1, maxWidth: !isBonusTask ? null : 220}}
            color={COLORS.Text.grey}>
            {listName}
          </Text>
        </ListStarViewItemMetaContainer>
        {isBonusTask && (
          <Text
            fontSize={15}
            fontWeight="600"
            fontFamily="Poppins-SemiBold"
            lineHeight={22}
            textAlign="left"
            color={COLORS.Text.grey}>
            {`x${starsAwarded}`}
          </Text>
        )}
      </ListStarViewItemContainer>
    );
  };

  const renderItemAsStar = () => {
    return (
      <>
        {!isBonusTask && renderDummyStar()}
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
              disabled={isCompletingStars || starButtonDisabled}>
              {isCompletedForToday && !isBonusTask && (
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
                style={{
                  opacity: isCompletedForToday && !isBonusTask ? 0.3 : 1,
                }}>
                <View>
                  <Text
                    style={styles.label}
                    fontSize={11}
                    fontWeight="500"
                    fontFamily="Poppins-Medium"
                    lineHeight={16}
                    textAlign="center"
                    marginTop={10}
                    numberOfLines={3}
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

  return (
    <>
      {listType === LIST_TYPE.list ? renderItemAsList() : renderItemAsStar()}
      <ChildAccessDeniedModal
        isVisible={showIsBonusAccessDeniedModal}
        onClose={closeAccessDeniedModals}
        title={ACCESS_DENIED_MESSAGE.bonus.title}
        content={ACCESS_DENIED_MESSAGE.bonus.message}
        headerImage={
          <Image
            source={ACCESS_DENIED_MESSAGE.bonus.headerImage.source}
            width={ACCESS_DENIED_MESSAGE.bonus.headerImage.width}
            height={ACCESS_DENIED_MESSAGE.bonus.headerImage.height}
          />
        }
      />
      <ChildAccessDeniedModal
        isVisible={showIsStarAccessDeniedModal}
        onClose={closeAccessDeniedModals}
        title={ACCESS_DENIED_MESSAGE.starRewards.title}
        content={ACCESS_DENIED_MESSAGE.starRewards.message}
        headerImage={
          <Image
            source={ACCESS_DENIED_MESSAGE.starRewards.headerImage.source}
            width={ACCESS_DENIED_MESSAGE.starRewards.headerImage.width}
            height={ACCESS_DENIED_MESSAGE.starRewards.headerImage.height}
          />
        }
      />
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
