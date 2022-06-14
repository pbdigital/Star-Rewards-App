import React, {useEffect, useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Button} from '../../Components/Button';
import {COLORS} from '../../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Toolbar} from '../../Components/Toolbar';
import {Text} from '../../Components/Text';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {Image} from '../../Components/Image';
import {Images} from '../../Assets/Images';
import {ChildTasksListItem, LimitInfo} from '../../Components';
import {CloudBackgroundRightOverLeft} from '../../Components/ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundRightOverLeft';
import {
  Container,
  Content,
  Footer,
  CloudBackgroundContainer,
  AvatarContainer,
  ToolbarContainer,
} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {childActions} from '../../Redux/Child/ChildSlice';
import moment from 'moment';
import {AvatarSpeaking} from '../../Components/AvatarSpeaking';
import {
  childIdSelector,
  childNameSelector,
  childRewardsTasksSelector,
} from '../../Redux/Child/ChildSelectors';
import {REWARD_ITEM_LIMIT} from '../../Constants/Defaults';

const TasksScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tasks = useSelector(childRewardsTasksSelector);
  const childId = useSelector(childIdSelector);
  const childName = useSelector(childNameSelector);

  const handleOnPressContinueButton = () => {
    navigation.navigate(NAV_ROUTES.addTasks);
  };

  const handleOnPressBtnGetStarted = () => {
    navigation.navigate(NAV_ROUTES.rewardsStackNavigator);
  };

  useEffect(() => {
    if (childId) {
      const payload = {
        childId,
        time: moment().format(),
      };
      dispatch(childActions.getChildTasks(payload));
    }
  }, [childId]);

  const renderFooter = useMemo(
    () => (
      <SafeAreaView
        edges={['bottom']}
        style={{backgroundColor: COLORS.Background.screen}}>
        <Footer>
          {tasks.length < REWARD_ITEM_LIMIT ? (
            <Button
              borderRadius={16}
              titleColor={COLORS.White}
              buttonColor={COLORS.Blue}
              shadowColor={COLORS.BlueShadow}
              onPress={handleOnPressContinueButton}
              title="Add Task"
              buttonTitleFontSize={16}
              leftIcon={<Image source={Images.IcAdd} width={24} height={24} />}
            />
          ) : (
            <LimitInfo />
          )}
          {tasks.length > 0 && (
            <Button
              borderRadius={16}
              titleColor={COLORS.White}
              buttonColor={COLORS.Green}
              shadowColor={COLORS.GreenShadow}
              onPress={handleOnPressBtnGetStarted}
              title="Get Started"
              buttonTitleFontSize={16}
              marginTop={10}
            />
          )}
        </Footer>
      </SafeAreaView>
    ),
    [tasks],
  );

  const renderTaskList = useMemo(() => {
    const renderItem = ({item}) => (
      <ChildTasksListItem {...item} marginBottom={16} />
    );

    return (
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.list}
        data={tasks}
        keyExtractor={item => `child-task-${item.name}`}
        renderItem={renderItem}
      />
    );
  }, [tasks]);

  const renderWelcomeAvatar = () => {
    const avatarSpeakWelcomeText = () => {
      return (
        <Text
          textAlign="center"
          fontSize={16}
          lineHeight={24}
          color={COLORS.Text.grey}
          fontWeight="400">
          What tasks do you want
          <Text
            textAlign="center"
            fontSize={16}
            lineHeight={24}
            color={COLORS.Text.grey}
            fontWeight="600">
            {`\n${childName} `}
          </Text>
          to get done?
        </Text>
      );
    };

    return (
      <Content>
        <AvatarContainer>
          <AvatarSpeaking message={avatarSpeakWelcomeText} bubble="top" />
          <CloudBackgroundContainer>
            <CloudBackgroundRightOverLeft />
          </CloudBackgroundContainer>
        </AvatarContainer>
      </Content>
    );
  };

  return (
    <>
      <ScreenBackground cloudType={0}>
        <Container>
          <ToolbarContainer>
            <Toolbar title="Tasks" />
          </ToolbarContainer>
          {tasks.length > 0 ? renderTaskList : renderWelcomeAvatar()}
        </Container>
      </ScreenBackground>
      {renderFooter}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {},
  list: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 16,
  },
});

export {TasksScreen};
