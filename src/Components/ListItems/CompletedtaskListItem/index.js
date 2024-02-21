/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useState, useCallback, forwardRef} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {Text} from '../../Text';
import {Container, Details, BonusStarInfo, Padded} from './styles';
import moment from 'moment';
import {batch, useDispatch} from 'react-redux';
import {childActions} from 'Redux';
import {ConfirmationModal} from 'src/Components/ConfirmationModal';
import {SwipeRow} from 'react-native-swipe-list-view';
import {ListSwipeControlButtons} from 'src/Components/ListSwipeControlButtons';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';

const weekDates = moment
  .weekdays()
  .map(day => day.split('').splice(0, 3).join(''));

const CompletedtaskListItem = forwardRef(
  (
    {
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
      handleOnRowOpen,
    },
    ref,
  ) => {
    const dispatch = useDispatch();
    const [
      isDeleteConfirmationModalVisible,
      setIsDeleteConfirmationModalVisible,
    ] = useState(false);
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
    const taskFrequency = useMemo(() => {
      if (!daysofWeek) {
        return '';
      }
      if (daysofWeek?.length >= 7) {
        return 'Everyday';
      }
      const selectedDays = daysofWeek.map(dayIndex => weekDates[dayIndex]);
      return selectedDays.join(', ');
    }, [daysofWeek, isBonusTask]);

    const openDeleteConfirmationModal = () =>
      setIsDeleteConfirmationModalVisible(true);

    const handleOnCloseConfirmationModal = () =>
      setIsDeleteConfirmationModalVisible(false);

    const handleDeleteTask = useCallback(async () => {
      setTimeout(() => setShowLoadingIndicator(true), 400);
      handleOnCloseConfirmationModal();
      const params = {
        childId,
        taskId: id,
      };
      const {payload} = await dispatch(
        childActions.deleteCompletedTaskHistory(params),
      );
      if (payload?.success) {
        await batch(() => {
          dispatch(childActions.getCompletedTaskHistory({childId}));
          dispatch(
            childActions.getChildTasks({childId, time: moment().format()}),
          );
        });
      }
      setTimeout(() => setShowLoadingIndicator(false), 500);
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
                  <Text
                    marginTop={3}
                    fontSize={13}
                    fontWeight="600"
                    color="#B46C00">
                    {starsAwarded}
                  </Text>
                </BonusStarInfo>
              </View>
            </Details>
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
            <Modal
              isVisible={showLoadingIndicator}
              animationIn={'fadeIn'}
              animationOut={'fadeOut'}>
              <ActivityIndicator />
            </Modal>
          </Container>
        </Padded>
      ),
      [
        name,
        taskFrequency,
        starsAwarded,
        isDeleteConfirmationModalVisible,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        handleDeleteTask,
        showLoadingIndicator,
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
      <Animatable.View animation="fadeIn">
        <SwipeRow
          ref={ref}
          key={`${id}-rewards-tasks-history`}
          rightOpenValue={-70}
          leftOpenValue={0}
          onRowOpen={handleOnRowOpen}>
          {renderHiddenItem({id})}
          {renderItem()}
        </SwipeRow>
      </Animatable.View>
    );
  },
);

export {CompletedtaskListItem};
