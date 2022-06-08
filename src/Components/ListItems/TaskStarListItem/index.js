import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Alert, Animated, Easing} from 'react-native';
import {Text} from '../../Text';
import {Images} from '../../../Assets/Images';
import {COLORS} from '../../../Constants/Colors';
import {Container, Star} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {childActions} from '../../../Redux/Child/ChildSlice';
import {childIdSelector} from '../../../Redux/Child/ChildSelectors';
import {STAR_POSITIONS} from '../../../Constants/StarPositions';
import moment from 'moment';
import {toolbarStarPositionSelector} from '../../../Redux/Layout/LayoutSelectors';
import {Default} from '../../../Constants/Defaults';

const containerPaddnigLeft = (Default.Dimensions.Width - 285) / 2;
const toolbarHeight = 76;

const TaskStarListItem = ({
  contentContainerStyle,
  task,
  onTaskCompleted,
  indexPosition,
  listContainerLayout,
}) => {
  const {name, id: taskId} = task;
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const toolbarStarPosition = useSelector(toolbarStarPositionSelector);

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
  const [itemLayout, setItemLayout] = useState();

  const startAnimation = useCallback(() => {
    Animated.timing(animatedYvalue, {
      toValue: -(listContainerLayout.y + toolbarHeight + itemLayout.y),
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    const toolbarStarCenterPointPosition = toolbarStarPosition.x + 15;
    const itemCenterPointPosition =
      containerPaddnigLeft + itemLayout.x + itemLayout.width / 2;

    Animated.timing(animatedXvalue, {
      toValue: toolbarStarCenterPointPosition - itemCenterPointPosition,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedWidth, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [
    listContainerLayout,
    itemLayout,
    toolbarStarPosition,
    animatedHeight,
    animatedWidth,
    animatedXvalue,
    animatedYvalue,
  ]);

  const completeTask = async () => {
    startAnimation();
    return;
    const payload = {
      childId,
      taskId,
      date: moment().format('YYYY-MM-DD'),
    };

    const {payload: resPayload} = await dispatch(
      childActions.completeChildTask(payload),
    );
    if (resPayload?.success) {
      onTaskCompleted(task);
    } else {
      Alert.alert(
        'Unable to complete a task as of the moment. Please try again later.',
      );
    }
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
        },
      ]}
      onLayout={handleOnLayout}>
      <Container onLongPress={completeTask}>
        <Star source={Images.Star} resizeMode="cover">
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
        </Star>
      </Container>
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
