import React, {useState, useCallback, forwardRef, useEffect} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {Text} from '../../Text';
import moment from 'moment';
import {batch, useDispatch} from 'react-redux';
import {childActions} from 'Redux';
import {ConfirmationModal} from 'src/Components/ConfirmationModal';
import {SwipeRow} from 'react-native-swipe-list-view';
import {ListSwipeControlButtons} from 'src/Components/ListSwipeControlButtons';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import {
  Container,
  Details,
  BonusStarInfo,
  Padded,
  ItemImage,
  ItemContent,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import { NAV_ROUTES } from '../../../Constants';
import { DeductPointsModal } from '../..';

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
      isDeleting,
      handleOnRowOpen,
    },
    ref,
  ) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [
      isDeleteConfirmationModalVisible,
      setIsDeleteConfirmationModalVisible,
    ] = useState(false);
    const [
      showDeductPoinstModal,
      setShowDeductPoinstModal,
    ] = useState(false);
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

    const openDeleteConfirmationModal = () =>
      setIsDeleteConfirmationModalVisible(true);
    const handleOnCloseConfirmationModal = () =>
      setIsDeleteConfirmationModalVisible(false);

    const openDeductPointsModal = () => setShowDeductPoinstModal(true);
    const closeDeductpointsModal = () => setShowDeductPoinstModal(false);

    const handleDeleteTask = useCallback(async () => {}, []);

    const {childId, emoji, id, name, starsToDeduct} = item ?? {};

    useEffect(() => {
      console.log({item, index});
    }, [item, index]);

    const renderItem = useCallback(
      () => (
        <Padded>
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
                  marginLeft={16}
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
              <TouchableOpacity onPress={openDeductPointsModal}>
                <BonusStarInfo source={Images.StarRed}>
                  <Text
                    marginTop={3}
                    fontSize={10}
                    fontWeight="600"
                    color={COLORS.White}>
                    -{starsToDeduct}
                  </Text>
                </BonusStarInfo>
              </TouchableOpacity>
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
            />
            <DeductPointsModal
              isVisible={showDeductPoinstModal}
              onClose={closeDeductpointsModal}
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
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        isDeleteConfirmationModalVisible,
        handleDeleteTask,
        showDeductPoinstModal,
        showLoadingIndicator,
      ],
    );

    const renderHiddenItem = useCallback(({item}, rowMap) => {
      const handleEditButton = () => {
        navigation.navigate(NAV_ROUTES.addSetbackBehaviorScreen, {
          setback: {
            behavior: 'test',
            starsToDeduct: '5',
          },
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
    }, []);

    return (
      <Animatable.View animation="fadeIn">
        <SwipeRow
          ref={ref}
          key={`${id}-set-back-item`}
          rightOpenValue={-120}
          leftOpenValue={0}
          onRowOpen={handleOnRowOpen}>
          {renderHiddenItem({id})}
          {renderItem()}
        </SwipeRow>
      </Animatable.View>
    );
  },
);

export {SetbacksListItem};
