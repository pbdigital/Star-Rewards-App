import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, Image} from 'react-native';
import {COLORS} from 'Constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NAV_ROUTES} from 'Constants';
import {
  Toolbar,
  AppTextInput,
  TaskDaySelector,
  ConfirmationModal,
  LoadingIndicator,
  Button,
  ScreenBackground,
  EmptyListState,
} from 'Components';
import {Container, Content, Footer} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty, noop} from 'lodash';
import {childActions, childIdSelector} from 'Redux';
import moment from 'moment';
import {Images} from 'Assets/Images';

const AddTasksScreen = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {handleOnSuccess, task} = route.params || {};
  const childId = useSelector(childIdSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [daysofWeek, setDaysofWeek] = useState([]);
  const [taskNameInputError, setTaskNameInputError] = useState(null);
  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible,
  ] = useState(false);

  const isEditing = useMemo(() => !!task, [task]);
  const toolbarTitle = useMemo(() => {
    return isEditing ? 'Update Task' : 'Add Task';
  }, [isEditing]);

  useEffect(() => {
    setTaskName(task?.name || '');
    setDaysofWeek(task?.daysofWeek || []);
  }, [task]);

  const addChildTask = useCallback(async () => {
    const data = {
      childId,
      payload: {
        daysofWeek: [...daysofWeek].sort(),
        name: taskName,
        isBonusTask: false,
      },
    };
    const {payload} = await dispatch(childActions.createChildTask(data));
    handleResultPayload(payload);
  }, [daysofWeek, taskName, childId, dispatch, handleResultPayload]);

  const updateChildTask = useCallback(async () => {
    console.log({daysofWeek});
    const data = {
      childId,
      payload: {
        ...task,
        daysofWeek: [...daysofWeek].sort(),
        name: taskName,
        isBonusTask: false,
      },
    };
    const {payload} = await dispatch(childActions.updateChildTask(data));
    handleResultPayload(payload);
  }, [task, daysofWeek, taskName, childId, dispatch, handleResultPayload]);

  const handleResultPayload = useCallback(
    async payload => {
      if (payload.success) {
        await dispatch(
          childActions.getChildTasks({
            childId,
            time: moment().format(),
          }),
        );
        setIsLoading(false);
        if (handleOnSuccess) {
          handleOnSuccess();
        } else {
          navigation.navigate(NAV_ROUTES.tasks);
        }
        return;
      }
      setIsLoading(false);
      const message =
        payload?.message || 'Unable to add new task. Please try again later';
      Alert.alert(message);
    },
    [childId, setIsLoading, handleOnSuccess, navigation, dispatch]);

  const handleOnPressContinueButton = async () => {
    if (isEmpty(taskName)) {
      setTaskNameInputError('Please enter the task name.');
      return;
    }

    if (isEmpty(daysofWeek)) {
      setTaskNameInputError('Please select at least one day.');
      return;
    }

    setIsLoading(true);
    if (isEditing) {
      updateChildTask();
    } else {
      addChildTask();
    }
  };

  const handleOnDaySelected = selectedIndex => {
    const isAlreadyAdded = daysofWeek.includes(selectedIndex);
    var newDaysOfWeek = [];
    if (isAlreadyAdded) {
      newDaysOfWeek = daysofWeek.filter(val => val !== selectedIndex);
    } else {
      newDaysOfWeek = [...daysofWeek, selectedIndex];
    }
    setDaysofWeek(newDaysOfWeek);
  };

  const handleDeleteTask = useCallback(async () => {
    setIsDeleteConfirmationModalVisible(false);
    setIsLoading(true);
    const {payload, meta} = await dispatch(
      childActions.deleteChildTask({childId, taskId: task?.id}),
    );
    if (payload?.success) {
      await dispatch(
        childActions.getChildTasks({childId, time: moment().format()}),
      );
    } else {
      setIsLoading(false);
      Alert.alert('Unable to delete this tasks. Please try again later.');
    }
    if (navigation.canGoBack) {
      navigation.goBack();
    }
  }, [dispatch, task, childId, navigation]);

  const handleOnTaskNameChange = val => {
    setTaskNameInputError(null);
    setTaskName(val);
  };

  const renderFooter = () => (
    <Footer>
      <Button
        borderRadius={16}
        titleColor={COLORS.White}
        buttonColor={COLORS.Green}
        shadowColor={COLORS.GreenShadow}
        onPress={handleOnPressContinueButton}
        title="Save"
        buttonTitleFontSize={16}
        disabled={isLoading || isEmpty(taskName) || isEmpty(daysofWeek)}
        isLoading={isLoading}
      />
    </Footer>
  );

  const handleOnCloseConfirmationModal = () =>
    setIsDeleteConfirmationModalVisible(false);

  return (
    <>
      <ScreenBackground cloudType={0}>
        <Container paddingLeft={16} paddingRight={16}>
          <Toolbar
            title={toolbarTitle}
            iconRight={
              isEditing ? (
                <Image source={Images.IcDelete} width={28} height={25} />
              ) : null
            }
            onPressRightIconButton={
              isEditing ? () => setIsDeleteConfirmationModalVisible(true) : noop
            }
          />
          <Content>
            <AppTextInput
              label="Task Name"
              marginBottom={30}
              onChangeText={handleOnTaskNameChange}
              errorMessage={taskNameInputError}
              value={taskName}
            />
            <TaskDaySelector
              selectedDays={daysofWeek}
              onDaySelected={handleOnDaySelected}
            />
          </Content>
        </Container>
        <EmptyListState
          message="It's time to set up a special task. This little mission will make every moment feels like a breeze among the clouds."
          footerNote=""
          starImage={
            <Image source={Images.StarryAddTask} width={138} height={132} />
          }
        />
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
      </ScreenBackground>
      {renderFooter()}
      {isLoading && <LoadingIndicator />}
    </>
  );
};

export {AddTasksScreen};
