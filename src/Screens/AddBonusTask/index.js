import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Alert} from 'react-native';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Button} from '../../Components/Button';
import {COLORS} from '../../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Toolbar, AppTextInput, StarsAwardedSelector} from '../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {childActions} from '../../Redux/Child/ChildSlice';
import {childIdSelector} from '../../Redux/Child/ChildSelectors';
import {Container, Content, Footer, PaddedHorizontal} from './styles';
import moment from 'moment';

const AddBonusTaskScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {task} = route.params || {};

  const childId = useSelector(childIdSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [starsAwarded, setStarsAwarded] = useState(1);
  const [taskNameInputError, setTaskNameInputError] = useState(null);

  const isEditing = useMemo(() => !!task, [task]);
  const toolbarTitle = useMemo(() => {
    return isEditing ? 'Update Bonus Stars' : 'Add Bonus Stars';
  }, [isEditing]);

  useEffect(() => {
    setTaskName(task?.name || '');
    setStarsAwarded(task?.starsAwarded || 1);
  }, [task]);

  const addChildBonusStar = useCallback(async () => {
    const data = {
      childId,
      payload: {
        name: taskName,
        starsAwarded,
        daysofWeek: [],
        isBonusTask: true,
      },
    };
    const {payload} = await dispatch(childActions.createChildTask(data));
    handleResultPayload(payload);
  }, [starsAwarded, taskName]);

  const updateChildBonusStar = useCallback(async () => {
    const data = {
      childId,
      payload: {
        ...task,
        name: taskName,
        starsAwarded,
        daysofWeek: [],
        isBonusTask: true,
      },
    };

    const {payload} = await dispatch(childActions.updateChildTask(data));
    handleResultPayload(payload);
  }, [task, starsAwarded, taskName]);

  const handleResultPayload = async payload => {
    setIsLoading(false);
    if (payload.success) {
      await dispatch(
        childActions.getChildTasks({
          childId,
          time: moment().format(),
        }),
      );

      navigation.goBack();
      return;
    }

    const message =
      payload?.message || 'Unable to add new task. Please try again later';
    Alert.alert(message);
  };

  const handleOnPressContinueButton = useCallback(async () => {
    if (isEmpty(taskName)) {
      setTaskNameInputError('Please enter the task name.');
      return;
    }

    setIsLoading(true);
    if (isEditing) {
      updateChildBonusStar();
    } else {
      addChildBonusStar();
    }
  }, [isEditing, taskName, starsAwarded]);

  const handleOnSelect = points => setStarsAwarded(points);

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
        <Container>
          <PaddedHorizontal>
            <Toolbar title={toolbarTitle} />
          </PaddedHorizontal>
          <Content>
            <PaddedHorizontal>
              <AppTextInput
                label="Task Name"
                marginBottom={30}
                onChangeText={handleOnTaskNameChange}
                errorMessage={taskNameInputError}
                value={taskName}
              />
            </PaddedHorizontal>
            <StarsAwardedSelector
              selectedStarsAwarded={starsAwarded}
              onSelect={handleOnSelect}
              formLabelStyle={styles.paddingHorizontal}
            />
          </Content>
        </Container>
      </ScreenBackground>
      {renderFooter()}
    </>
  );
};

const styles = StyleSheet.create({
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
});

export {AddBonusTaskScreen};
