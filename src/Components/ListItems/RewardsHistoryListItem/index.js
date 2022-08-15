import React, {forwardRef, useCallback, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {Text} from '../../Text';
import {Container, Details, BonusStarInfo, Padded} from './styles';
import moment from 'moment';
import {batch, useDispatch} from 'react-redux';
import {childActions} from 'Redux';
import {SwipeRow} from 'react-native-swipe-list-view';
import {ListSwipeControlButtons} from 'src/Components/ListSwipeControlButtons';
import {ConfirmationModal} from 'Components';
import Modal from 'react-native-modal';

const RewardsHistoryListItem = forwardRef(
  (
    {
      id,
      name,
      childId,
      emoji,
      starsNeededToUnlock,
      date,
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

    const renderItem = useCallback(() => {
      return (
        <Padded>
          <Container
            marginTop={marginTop}
            marginBottom={marginBottom}
            marginLeft={marginLeft}
            marginRight={marginRight}>
            <Details>
              <Text fontSize={40} lineHeight={50} textAlign="center">
                {emoji}
              </Text>
              <View style={{flex: 1, marginLeft: 16}}>
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
                  color={COLORS.Text.lightGrey}>
                  {moment(date).format('D/MM/YYYY')}
                </Text>
              </View>
              <View>
                <BonusStarInfo source={Images.Star}>
                  <Text fontSize={13} fontWeight="600" color="#B46C00">
                    {starsNeededToUnlock}
                  </Text>
                </BonusStarInfo>
              </View>
            </Details>
            <ConfirmationModal
              isVisible={isDeleteConfirmationModalVisible}
              title="Are you sure you want to delete this reward?"
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
      );
    }, [
      emoji,
      starsNeededToUnlock,
      name,
      date,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      showLoadingIndicator,
      isDeleteConfirmationModalVisible,
      handleDeleteTask,
    ]);

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
          dispatch(childActions.getRewardsHistory({childId}));
          dispatch(
            childActions.getChildTasks({childId, time: moment().format()}),
          );
        });
      }
      setTimeout(() => setShowLoadingIndicator(false), 500);
    }, [childId, id]);

    const renderHiddenItem = useCallback(() => {
      return (
        <Padded>
          <ListSwipeControlButtons
            key={`${id}-completed-task`}
            item={{id}}
            hideNeutralButton={true}
            onPressDangerButton={openDeleteConfirmationModal}
          />
        </Padded>
      );
    }, [id]);

    return (
      <SwipeRow
        ref={ref}
        key={`${id}-rewards-tasks`}
        rightOpenValue={-70}
        leftOpenValue={0}
        onRowOpen={handleOnRowOpen}>
        {renderHiddenItem()}
        {renderItem()}
      </SwipeRow>
    );
  },
);

export {RewardsHistoryListItem};
