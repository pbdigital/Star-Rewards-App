/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, forwardRef} from 'react';
import {ActivityIndicator, Alert, TouchableWithoutFeedback} from 'react-native';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {Text} from '../../Text';
import {useDispatch} from 'react-redux';
import {childActions} from 'Redux';
import {ConfirmationModal} from 'src/Components/ConfirmationModal';
import {SwipeRow} from 'react-native-swipe-list-view';
import {ListSwipeControlButtons} from 'src/Components/ListSwipeControlButtons';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import {Container, Details, BonusStarInfo, Padded, ItemContent} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../../Constants';
import {DeductPointsModal} from '../..';

const SetbacksListItem = forwardRef(
  (
    {
      item,
      index,
      hideCloseButton,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      isLoading,
      handleOnRowOpen,
      onPressUpdateButton,
      onPressDeleteButton,
      closeRow,
    },
    ref,
  ) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [
      isDeleteConfirmationModalVisible,
      setIsDeleteConfirmationModalVisible,
    ] = useState(false);
    const [showDeductPoinstModal, setShowDeductPoinstModal] = useState(false);
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

    const openDeleteConfirmationModal = () =>
      setIsDeleteConfirmationModalVisible(true);
    const handleOnCloseConfirmationModal = () => {
      if (closeRow) {
        closeRow();
      }
      setIsDeleteConfirmationModalVisible(false);
    };

    const openDeductPointsModal = () => setShowDeductPoinstModal(true);
    const closeDeductpointsModal = () => {
      if (closeRow) {
        closeRow();
      }
      setShowDeductPoinstModal(false);
    };

    const {childId, emoji, id, name, starsToDeduct} = item ?? {};

    const handleDeleteTask = useCallback(async () => {
      isLoading(true);
      handleOnCloseConfirmationModal();
      const result = await dispatch(
        childActions.deleteChildSetback({
          childId,
          setbackId: id,
        }),
      );
      const {success} = result?.payload ?? {};
      isLoading(false);
      if (!success) {
        setTimeout(() => {
          Alert.alert(
            'Setbacks',
            'Unable to delete this item. Please try again later.',
          );
        }, 200);
      }
    }, [childId, dispatch, id]);

    const renderItem = useCallback(
      () => (
        <Padded>
          <TouchableWithoutFeedback onPress={openDeductPointsModal}>
            <Container
              marginTop={marginTop}
              marginBottom={marginBottom}
              marginLeft={marginLeft}
              marginRight={marginRight}>
              <Details>
                <ItemContent>
                  <Text
                    fontSize={40}
                    fontWeight="600"
                    lineHeight={48}
                    color={COLORS.Text.black}>
                    {emoji}
                  </Text>
                  <Text
                    fontSize={16}
                    fontWeight="600"
                    lineHeight={28}
                    marginLeft={16}
                    style={{flex: 1}}
                    color={COLORS.Text.black}>
                    {name}
                  </Text>
                </ItemContent>
                <BonusStarInfo source={Images.StarRed}>
                  <Text
                    marginTop={3}
                    fontSize={10}
                    fontWeight="600"
                    color={COLORS.White}>
                    -{starsToDeduct}
                  </Text>
                </BonusStarInfo>
              </Details>
              <ConfirmationModal
                isVisible={isDeleteConfirmationModalVisible}
                title="Are you sure you want to delete this behavior?"
                negativeButtonText="Cancel"
                positiveButtonText="Delete"
                buttonFontSize={20}
                buttonTextColor={COLORS.Blue}
                onPressPositiveButton={handleDeleteTask}
                onClose={handleOnCloseConfirmationModal}
                onPressNegativeButton={handleOnCloseConfirmationModal}
                emoji={emoji}
                modalProps={{
                  onBackdropPress: handleOnCloseConfirmationModal,
                }}
              />
              <DeductPointsModal
                isVisible={showDeductPoinstModal}
                onClose={closeDeductpointsModal}
                setback={item}
                isLoading={isLoading}
              />
              <Modal
                isVisible={showLoadingIndicator}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}>
                <ActivityIndicator />
              </Modal>
            </Container>
          </TouchableWithoutFeedback>
        </Padded>
      ),
      [
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        emoji,
        name,
        starsToDeduct,
        isDeleteConfirmationModalVisible,
        handleDeleteTask,
        showDeductPoinstModal,
        item,
        showLoadingIndicator,
      ],
    );

    const renderHiddenItem = useCallback(() => {
      const handleEditButton = () => {
        if (onPressUpdateButton) {
          onPressUpdateButton();
        }
        navigation.navigate(NAV_ROUTES.addSetbackBehaviorScreen, {
          setback: item,
        });
      };
      return (
        <Padded>
          <ListSwipeControlButtons
            key={`${id}-set-backs-hidded-item`}
            item={item}
            onPressDangerButton={openDeleteConfirmationModal}
            onPressNeutralButton={handleEditButton}
          />
        </Padded>
      );
    }, [item]);

    return (
      <Animatable.View animation="fadeIn">
        <SwipeRow
          ref={ref}
          key={`${id}-set-back-item`}
          rightOpenValue={-120}
          leftOpenValue={0}
          onRowOpen={handleOnRowOpen}>
          {renderHiddenItem()}
          {renderItem()}
        </SwipeRow>
      </Animatable.View>
    );
  },
);

export {SetbacksListItem};
