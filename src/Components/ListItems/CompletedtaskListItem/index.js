import React, {useMemo} from 'react';
import {ImageBackground, View} from 'react-native';
import {COLORS} from 'Constants';
import {Image} from '../../Image';
import {Images} from 'Assets/Images';
import {Text} from '../../Text';
import {CloseButton, Container, Details, BonusStarInfo, Padded} from './styles';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {childActions} from 'Redux';
import {doHapticFeedback} from 'Helpers';
import { ConfirmationModal } from 'src/Components/ConfirmationModal';
import { useState } from 'react';
import { useCallback } from 'react';
import { childIdSelector } from 'Redux';
import { SwipeRow } from 'react-native-swipe-list-view';
import { ListSwipeControlButtons } from 'src/Components/ListSwipeControlButtons';

const weekDates = moment
  .weekdays()
  .map(day => day.split('').splice(0, 3).join(''));

const CompletedtaskListItem = ({
  childId,
  daysofWeek,
  id,
  isBonusTask,
  name,
  starsAwarded,
  hideCloseButton,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  isDeleting,
}) => {
  const dispatch = useDispatch();
  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible,
  ] = useState(false);
  const taskFrequency = useMemo(() => {
    if (daysofWeek?.length >= 7) {
      return 'Everyday';
    }
    const selectedDays = daysofWeek.map(dayIndex => weekDates[dayIndex]);
    return selectedDays.join(', ');
  }, [daysofWeek, isBonusTask]);

  const handleOnPressCloseButton = async () => {
    doHapticFeedback();
    dispatch(childActions.setIsLoading(true));
    const {payload, meta} = await dispatch(
      childActions.deleteChildTask({childId, taskId: id}),
    );
    if (payload?.success) {
      await dispatch(
        childActions.getChildTasks({childId, time: moment().format()}),
      );
    }
    dispatch(childActions.setIsLoading(false));
  };

  const openDeleteConfirmationModal = () =>
    setIsDeleteConfirmationModalVisible(true);
  const handleOnCloseConfirmationModal = () =>
    setIsDeleteConfirmationModalVisible(false);
  const handleDeleteTask = useCallback(() => {

  }, [childId, id]);

  const renderItem = useCallback(
    () => (
      <Padded>
        <Container
          marginTop={marginTop}
          marginBottom={marginBottom}
          marginLeft={marginLeft}
          marginRight={marginRight}>
          <Details>
            <View style={{flex: 1}}>
              <Text
                fontSize={18}
                fontWeight="600"
                lineHeight={27}
                marginBottom={4}
                color={COLORS.Text.black}>
                {name}
              </Text>
              <Text
                fontSize={14}
                fontWeight="400"
                lineHeight={21}
                color={COLORS.Blue}>
                {taskFrequency}
              </Text>
            </View>
            <View>
              <BonusStarInfo source={Images.Star}>
                <Text fontSize={13} fontWeight="600" color="#B46C00">
                  {starsAwarded}
                </Text>
              </BonusStarInfo>
            </View>
          </Details>
          {!hideCloseButton && (
            <CloseButton onPress={handleOnPressCloseButton}>
              <Image source={Images.IcClose} width={12} height={12} />
            </CloseButton>
          )}
          <ConfirmationModal
            isVisible={isDeleteConfirmationModalVisible}
            title="Are you sure you want to delete this task?"
            negativeButtonText="Cancel"
            positiveButtonText="Delete"
            buttonFontSize={20}
            buttonTextColor={COLORS.Blue}
            onPressPositiveButton={handleDeleteTask}
            onClose={handleOnCloseConfirmationModal}
            onPressNegativeButton={handleOnCloseConfirmationModal}
          />
        </Container>
      </Padded>
    ),
    [
      name,
      taskFrequency,
      starsAwarded,
      isDeleteConfirmationModalVisible,
      hideCloseButton,
    ],
  );

  const renderHiddenItem = useCallback(({item}, rowMap) => {
    return (
      <Padded>
        <ListSwipeControlButtons
          key={`${id}-completed-task`}
          item={item}
          hideNeutralButton={true}
          onPressDangerButton={openDeleteConfirmationModal}
        />
      </Padded>
    );
  }, []);

  return (
    <SwipeRow
      // ref={ref => refTasksSwipeRow?.push(ref)}
      key={`${id}-rewards-tasks-history`}
      rightOpenValue={-70}
      leftOpenValue={0}
      // onRowPress={() => handleOnPressEditButton(item)}
      onRowOpen={() => {
        // closeRowExcept(refTasksSwipeRow, index);
        // closeRowExcept(refBonusTasksSwipeRow, null);
      }}>
      {renderHiddenItem({id})}
      {renderItem()}
    </SwipeRow>
  );
};

export {CompletedtaskListItem};
