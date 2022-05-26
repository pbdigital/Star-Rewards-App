import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Alert} from 'react-native';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Button} from '../../Components/Button';
import {COLORS} from '../../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Toolbar, AppTextInput, StarsAwardedSelector} from '../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {childActions} from '../../Redux/Child/ChildSlice';
import {childIdSelector} from '../../Redux/Child/ChildSelectors';
import {Container, Content, Footer, PaddedHorizontal} from './styles';

const AddBonusTaskScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const childId = useSelector(childIdSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [starsAwarded, setStarsAwarded] = useState(1);
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
          name: taskName,
          starsAwarded,
          daysofWeek: [],
          isBonusTask: true,
        },
      }),
    );
    setIsLoading(false);
    if (payload.success) {
      navigation.goBack();
      return;
    }

    const message =
      payload?.message || 'Unable to add new task. Please try again later';
    Alert.alert(message);
  };

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
            <Toolbar title="Add Bonus Stars" />
          </PaddedHorizontal>
          <Content>
            <PaddedHorizontal>
              <AppTextInput
                label="Task Name"
                marginBottom={30}
                onChangeText={handleOnTaskNameChange}
                errorMessage={taskNameInputError}
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
