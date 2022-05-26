import React, {useState} from 'react';
import {Alert} from 'react-native';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Button} from '../../Components/Button';
import {COLORS} from '../../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {Toolbar, AppTextInput, TaskDaySelector} from '../../Components';
import {Container, Content, Footer} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {childActions} from '../../Redux/Child/ChildSlice';
import {childIdSelector} from '../../Redux/Child/ChildSelectors';

const AddTasksScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const childId = useSelector(childIdSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [daysofWeek, setDaysofWeek] = useState([]);
  const [taskNameInputError, setTaskNameInputError] = useState(null);

  const handleOnPressContinueButton = async () => {
    if (isEmpty(taskName)) {
      setTaskNameInputError('Please enter the task name.');
      return;
    }

    setIsLoading(true);
    const {payload} = await dispatch(
      childActions.createChildTask({
        childId,
        payload: {
          daysofWeek,
          name: taskName,
          starsAwarded: 1,
          isBonusTask: false,
        },
      }),
    );
    setIsLoading(false);
    if (payload.success) {
      navigation.navigate(NAV_ROUTES.tasks);
      return;
    }

    const message =
      payload?.message || 'Unable to add new task. Please try again later';
    Alert.alert(message);
  };

  const handleOnDaySelected = selectedIndex => {
    const strSelectedIndex = `${selectedIndex}`;
    const isAlreadyAdded = daysofWeek.includes(strSelectedIndex);
    var newDaysOfWeek = [];
    if (isAlreadyAdded) {
      newDaysOfWeek = daysofWeek.filter(val => val !== strSelectedIndex);
    } else {
      newDaysOfWeek = [...daysofWeek, strSelectedIndex];
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
          <Toolbar title="Add Tasks" />
          <Content>
            <AppTextInput
              label="Task Name"
              marginBottom={30}
              onChangeText={handleOnTaskNameChange}
              errorMessage={taskNameInputError}
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
