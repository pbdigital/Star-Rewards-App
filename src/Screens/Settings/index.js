import React, {useEffect, useState, useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
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
} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {
  childAvatarSelector,
  childBonusTasksSelector,
  childIdSelector,
  childNameSelector,
  childRewardsTasksSelector,
} from '../../Redux/Child/ChildSelectors';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
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
} from './styles';
import {childActions} from '../../Redux/Child/ChildSlice';
import {NAV_ROUTES} from '../../Constants/Navigations';
import moment from 'moment';

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

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const childName = useSelector(childNameSelector);
  const childId = useSelector(childIdSelector);
  const avatarId = useSelector(childAvatarSelector);
  const rewardsTasks = useSelector(childRewardsTasksSelector);
  const bonusTasks = useSelector(childBonusTasksSelector);

  const refTasks = useRef(null);
  const refBonusTasks = useRef(null);

  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [nameInputVal, setNameInputVal] = useState('');
  const [childNameInputError, setChildNameInputError] = useState(null);
  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible,
  ] = useState(false);

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

  const renderItem = ({index, item}, rowMap) => {
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
  };

  const handleOnPressEditButton = item => {
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
  };

  const renderHiddenItem = ({item}, rowMap) => {
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
  };

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
    closeAllOpenedTasksInTheList()
    setShowLoadingIndicator(false);
  }, [taskIdToDelete]);

  const closeAllOpenedTasksInTheList = () => {
    if (refTasks && refBonusTasks) {
      refTasks.current.closeAllOpenRows();
      refBonusTasks.current.closeAllOpenRows();
    }
  };

  const hideDeleteConfirmationModal = () => {
    setTaskIdToDelete(null);
    setIsDeleteConfirmationModalVisible(false);
  };

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

  return (
    <>
      <Root>
        <Container>
          <Padded>
            <Toolbar
              title="Settings"
              iconRight={
                <Image source={Images.IcClock} width={28} height={25} />
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
                disableAddIconButton={rewardsTasks?.length >= 5}
              />
            </Padded>
            <ListWrapper>
              <SwipeListView
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
              />
            </ListWrapper>
            <Padded>
              <Label
                showAddButton
                marginTop={40}
                marginBottom={23}
                value="Bonus Stars"
                onPressAddButton={handleOnPressAddBonusTasks}
                disableAddIconButton={bonusTasks?.length >= 5}
              />
            </Padded>
            <ListWrapper>
              <SwipeListView
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
              />
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
        </Container>
      </Root>
      {showLoadingIndicator && <LoadingIndicator />}
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
