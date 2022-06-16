import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from '../../Assets/Images';
import {isEmpty} from 'lodash';
import {
  Button,
  Image,
  ImageChildAvatar,
  Toolbar,
  Text,
  ChildTasksListItem,
  AppTextInput,
  ListSwipeControlButtons,
  ConfirmationModal,
  LoadingIndicator,
  AppAlertModal,
} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {
  childAvatarSelector,
  childBonusTasksSelector,
  childIdSelector,
  childNameSelector,
  childRewardsTasksSelector,
} from '../../Redux/Child/ChildSelectors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {childActions} from '../../Redux/Child/ChildSlice';
import {NAV_ROUTES} from '../../Constants/Navigations';
import moment from 'moment';
import {REWARD_ITEM_LIMIT} from '../../Constants/Defaults';
import {noop} from 'lodash';
import {
  Root,
  Container,
  Content,
  AvatarContainer,
  AvatarChangeButton,
  LabelContainer,
  SmallAddIconButton,
  ListWrapper,
  Padded,
  SuccessModalContaier,
} from './styles';
import { setGestureState } from 'react-native-reanimated/lib/reanimated2/NativeMethods';

const Label = ({
  value,
  showAddButton,
  marginTop,
  marginBottom,
  onPressAddButton,
  disableAddIconButton = false,
}) => (
  <LabelContainer marginTop={marginTop} marginBottom={marginBottom}>
    <Text
      fontSize={18}
      lineHeight={27}
      fontWeight="600"
      textAlign="center"
      color={COLORS.Text.black}>
      {value}
    </Text>
    {showAddButton && (
      <SmallAddIconButton
        onPress={onPressAddButton}
        disabled={disableAddIconButton}>
        <Image source={Images.IcAdd} width={14} height={14} />
      </SmallAddIconButton>
    )}
  </LabelContainer>
);

// TODO: FIX 
// After editing a task swiping the list is nto opening
// Only open 1 row
// close row after update, delete
const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {showDeleteButton} = route.params || {};
  const childName = useSelector(childNameSelector);
  const childId = useSelector(childIdSelector);
  const avatarId = useSelector(childAvatarSelector);
  const rewardsTasks = useSelector(childRewardsTasksSelector);
  const bonusTasks = useSelector(childBonusTasksSelector);

  const refTasks = useRef(null);
  const refBonusTasks = useRef(null);
  // change this, try useState instead so we can clear the array anytime
  const [refTasksSwipeRow, setRefTasksSwipeRow] = useState([]);
  const [refBonusTasksSwipeRow, setRefBonusTasksSwipeRow] = useState([]);
  // const refTasksSwipeRow = useRef([]).current;
  // const refBonusTasksSwipeRow = useRef([]).current;

  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [nameInputVal, setNameInputVal] = useState('');
  const [childNameInputError, setChildNameInputError] = useState(null);
  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible,
  ] = useState(false);
  const [
    isDeleteChildConfirmationModalVisible,
    setIsDeleteChildConfirmationModalVisible,
  ] = useState(false);
  const [showAlertDeleteChildSuccess, setShowAlertDeleteChildSuccess] =
    useState(false);

  useEffect(() => {
    setNameInputVal(childName);
  }, [childName]);

  const handleOnTaskNameChange = val => {
    setChildNameInputError(null);
    setNameInputVal(val);
  };

  const handleOnPressSaveButton = useCallback(async () => {
    if (isEmpty(nameInputVal)) {
      setChildNameInputError('Please enter your child\'s name.');
      return;
    }
    setIsLoading(true);
    console.log('NAME INPUT VAL', {nameInputVal, childId, avatarId});
    await dispatch(
      childActions.updateChild({
        childId,
        name: nameInputVal,
        avatarId: avatarId,
      }),
    );
    setIsLoading(false);
  }, [dispatch, childId, nameInputVal, avatarId]);

  const renderItem = useCallback(
    ({index, item}, rowMap) => {
      const fromTaskList = item?.isBonusTask ? bonusTasks : rewardsTasks;
      let isLast = index === fromTaskList.length - 1;
      return (
        <Padded>
          <ChildTasksListItem
            {...item}
            hideCloseButton={true}
            marginTop={0}
            marginBottom={isLast ? 0 : 16}
          />
        </Padded>
      );
    },
    [bonusTasks, rewardsTasks],
  );

  const handleOnPressEditButton = useCallback(
    item => {
      const params = {
        task: item,
        handleOnSuccess: () => {
          if (navigation.canGoBack) {
            navigation.goBack();
          }
        },
      };
      if (item.isBonusTask) {
        navigation.navigate(NAV_ROUTES.addBonusTasks, params);
      } else {
        navigation.navigate(NAV_ROUTES.addTasks, params);
      }
    },
    [navigation],
  );

  const renderHiddenItem = useCallback(
    ({item}, rowMap) => {
      return (
        <Padded>
          <ListSwipeControlButtons
            key={`${item.challenge}-index-controls`}
            item={item}
            onPressDangerButton={openDeleteConfirmationModal}
            onPressNeutralButton={() => handleOnPressEditButton(item)}
          />
        </Padded>
      );
    },
    [handleOnPressEditButton],
  );

  const handleOnPressAddBonusTasks = () => {
    navigation.navigate(NAV_ROUTES.addBonusTasks);
  };

  const handleOnPressAddStar = () => {
    navigation.navigate(NAV_ROUTES.addTasks, {
      handleOnSuccess: () => {
        if (navigation.canGoBack) {
          navigation.goBack();
        }
      },
    });
  };

  const handleDeleteSelectedTask = useCallback(async () => {
    hideDeleteConfirmationModal();
    if (!taskIdToDelete) {
      return;
    }
    setShowLoadingIndicator(true);
    const {payload, meta} = await dispatch(
      childActions.deleteChildTask({childId, taskId: taskIdToDelete}),
    );
    if (payload?.success) {
      await dispatch(
        childActions.getChildTasks({childId, time: moment().format()}),
      );
    }
    closeAllOpenedTasksInTheList();
    setShowLoadingIndicator(false);
  }, [taskIdToDelete]);

  const closeAllOpenedTasksInTheList = () => {
    if (refTasks && refBonusTasks) {
      refTasks.current.closeAllOpenRows();
      refBonusTasks.current.closeAllOpenRows();
    }
  };

  const hideDeleteConfirmationModal = useCallback(() => {
    setTaskIdToDelete(null);
    setIsDeleteConfirmationModalVisible(false);
    setIsDeleteChildConfirmationModalVisible(false);
  }, []);

  const openDeleteConfirmationModal = ({taskId}) => {
    setTaskIdToDelete(taskId);
    setIsDeleteConfirmationModalVisible(true);
  };

  const handleOnAvatarPress = () => {
    navigation.navigate(NAV_ROUTES.chooseAvatar, {
      isEditing: true,
      name: childName,
      childAvatarId: avatarId,
      onSuccess: () => {
        if (navigation.canGoBack) {
          navigation.goBack();
        }
      },
    });
  };

  const handleOnCloseConfirmationModal = () => {
    closeAllOpenedTasksInTheList();
    hideDeleteConfirmationModal();
  };

  const processDeleteChild = useCallback(async () => {
    hideDeleteConfirmationModal();
    setIsLoading(true);
    const {payload} = await dispatch(childActions.deleteChild({childId}));
    if (payload?.success) {
      setShowAlertDeleteChildSuccess(true);
      await dispatch(childActions.getAllChildren());
      setIsLoading(false);
    } else {
      setIsLoading(false);
      Alert.alert(
        'Unable to delete this child profile. Please try again later',
      );
    }
  }, [childId, hideDeleteConfirmationModal, dispatch]);

  const handleOnPressDeleteChild = () => {
    setIsDeleteChildConfirmationModalVisible(true);
  };

  const renderRewardList = useMemo(() => {
    setRefTasksSwipeRow([]);
    const closeRowExcept = activeIndex => {
      refTasksSwipeRow.forEach((itemSwipeRow, index) => {
        if (index === activeIndex) {
          return;
        }

        itemSwipeRow?.closeRow();
      });
    }
    return rewardsTasks.map((item, index) => {
      return (
        <SwipeRow
          ref={ref => refTasksSwipeRow.push(ref)}
          key={`${item?.id}-rewards-tasks`}
          rightOpenValue={-120}
          leftOpenValue={0}
          onRowOpen={() => closeRowExcept(index)}>
          {renderHiddenItem({item})}
          {renderItem({item, index})}
        </SwipeRow>
      );
    });
  }, [rewardsTasks, renderHiddenItem, renderItem]);

  const renderBonusTaskList = useMemo(() => {
    setRefBonusTasksSwipeRow([]);
    const closeRowExcept = activeIndex => {
      console.log({refBonusTasksSwipeRow});
      refBonusTasksSwipeRow.forEach((itemSwipeRow, index) => {
        if (index === activeIndex) {
          return;
        }

        itemSwipeRow?.closeRow();
      });
    }
    return bonusTasks.map((item, index) => {
      return (
        <SwipeRow
          ref={ref => refBonusTasksSwipeRow.push(ref)}
          key={`${item?.id}-bonus-tasks`}
          rightOpenValue={-120}
          leftOpenValue={0}
          onRowOpen={() => closeRowExcept(index)}>
          {renderHiddenItem({item})}
          {renderItem({item, index})}
        </SwipeRow>
      );
    });
  }, [bonusTasks, renderHiddenItem, renderItem]);

  return (
    <>
      <Root>
        <Container>
          <Padded>
            <Toolbar
              title="Settings"
              iconRight={
                showDeleteButton ? (
                  <Image source={Images.IcDelete} width={28} height={25} />
                ) : null
              }
              onPressRightIconButton={
                showDeleteButton ? handleOnPressDeleteChild : noop
              }
            />
          </Padded>
          <Content>
            <AvatarChangeButton onPress={handleOnAvatarPress}>
              <AvatarContainer>
                <ImageChildAvatar width={60} height={60} />
              </AvatarContainer>
              <Text
                fontSize={18}
                lineHeight={27}
                fontWeight="500"
                textAlign="center"
                marginTop={8}
                color={COLORS.Blue}>
                Choose avatar
              </Text>
            </AvatarChangeButton>
            <Padded>
              <AppTextInput
                label="Name"
                onChangeText={handleOnTaskNameChange}
                errorMessage={childNameInputError}
                value={nameInputVal}
                style={styles.textInput}
              />
            </Padded>
            <Padded>
              <Label
                showAddButton
                marginTop={40}
                marginBottom={23}
                value="Current Tasks"
                onPressAddButton={handleOnPressAddStar}
                disableAddIconButton={rewardsTasks?.length >= REWARD_ITEM_LIMIT}
              />
            </Padded>
            <ListWrapper>
              {/* <SwipeListView
                data={rewardsTasks}
                keyExtractor={item => `${item?.id}-rewards-tasks`}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={0}
                rightOpenValue={-120}
                scrollEnabled={false}
                ref={refTasks}
                closeOnRowBeginSwipe
                disableRightSwipe
              /> */}
              {renderRewardList}
            </ListWrapper>
            <Padded>
              <Label
                showAddButton
                marginTop={40}
                marginBottom={23}
                value="Bonus Stars"
                onPressAddButton={handleOnPressAddBonusTasks}
                disableAddIconButton={bonusTasks?.length >= REWARD_ITEM_LIMIT}
              />
            </Padded>
            <ListWrapper>
              {/* <SwipeListView
                data={bonusTasks}
                keyExtractor={item => `${item?.id}-bonus-tasks`}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={0}
                rightOpenValue={-120}
                scrollEnabled={false}
                ref={refBonusTasks}
                closeOnRowBeginSwipe
                disableRightSwipe
              /> */}
              {renderBonusTaskList}
            </ListWrapper>
          </Content>
          <Padded>
            <Button
              borderRadius={16}
              titleColor={COLORS.White}
              buttonColor={COLORS.Green}
              shadowColor={COLORS.GreenShadow}
              onPress={handleOnPressSaveButton}
              title="Save"
              buttonTitleFontSize={16}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </Padded>
          <ConfirmationModal
            isVisible={isDeleteConfirmationModalVisible}
            title="Are you sure you want to delete this task?"
            negativeButtonText="Cancel"
            positiveButtonText="Delete"
            buttonFontSize={20}
            buttonTextColor={COLORS.Blue}
            onPressPositiveButton={handleDeleteSelectedTask}
            onClose={handleOnCloseConfirmationModal}
            onPressNegativeButton={handleOnCloseConfirmationModal}
          />
          <ConfirmationModal
            isVisible={isDeleteChildConfirmationModalVisible}
            title="Are you sure you want to delete this child account?"
            negativeButtonText="Cancel"
            positiveButtonText="Delete"
            buttonFontSize={20}
            buttonTextColor={COLORS.Blue}
            onPressPositiveButton={processDeleteChild}
            onClose={handleOnCloseConfirmationModal}
            onPressNegativeButton={handleOnCloseConfirmationModal}
          />
        </Container>
      </Root>
      {showLoadingIndicator && <LoadingIndicator />}
      <AppAlertModal
        isVisible={showAlertDeleteChildSuccess}
        onClose={() => {
          setShowAlertDeleteChildSuccess(false);
          if (navigation?.canGoBack) {
            navigation.goBack();
          }
        }}>
        <SuccessModalContaier>
          <Image source={Images.IcSuccess} width={60} height={60} />
          <Text
            fontSize={20}
            lineHeight={30}
            fontWeight="600"
            textAlign="center"
            marginTop={20}
            color={COLORS.Text.black}>
            The child account was successfully deleted.
          </Text>
        </SuccessModalContaier>
      </AppAlertModal>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    color: COLORS.Text.grey,
    fontWeight: '400',
  },
});

export {SettingsScreen};
