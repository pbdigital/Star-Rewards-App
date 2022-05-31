import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Button} from '../../Components/Button';
import {COLORS} from '../../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {Toolbar, AppTextInput, TaskDaySelector} from '../../Components';
import {Container, Content, Footer} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {childActions} from '../../Redux/Child/ChildSlice';
import {childIdSelector} from '../../Redux/Child/ChildSelectors';
import moment from 'moment';

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
        starsAwarded: 1,
        isBonusTask: false,
      },
    };
    const {payload} = await dispatch(childActions.createChildTask(data));
    handleResultPayload(payload);
  }, [daysofWeek, taskName]);

  const updateChildTask = useCallback(async () => {
    console.log({daysofWeek});
    const data = {
      childId,
      payload: {
        ...task,
        daysofWeek: [...daysofWeek].sort(),
        name: taskName,
        starsAwarded: 1,
        isBonusTask: false,
      },
    };
    const {payload} = await dispatch(childActions.updateChildTask(data));
    handleResultPayload(payload);
  }, [task, daysofWeek, taskName]);

  const handleResultPayload = async payload => {
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
  };

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

  const handleOnTaskNameChange = val => {
    setTaskNameInputError(null);
    setTaskName(val);
  };

  const renderFooter = () => (
    <SafeAreaView
      edges={['bottom']}
      style={{backgroundColor: COLORS.Background.screen}}>
      <Footer>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressContinueButton}
          title="Save"
          buttonTitleFontSize={16}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </Footer>
    </SafeAreaView>
  );

  return (
    <>
      <ScreenBackground cloudType={0}>
        <Container paddingLeft={16} paddingRight={16}>
          <Toolbar title={toolbarTitle} />
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
      </ScreenBackground>
      {renderFooter()}
    </>
  );
};

export {AddTasksScreen};
