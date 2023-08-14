import React, {useEffect, useMemo} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, DEFAULT_TASKS} from 'Constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {NAV_ROUTES} from 'Constants';
import {Images} from 'Assets/Images';
import {
  ChildTasksListItem,
  LimitInfo,
  LoadingIndicator,
  Toolbar,
  Text,
  Image,
  Button,
  ScreenBackground,
  EmptyListState,
} from 'Components';
import {useDispatch, useSelector} from 'react-redux';
import {
  childIdSelector,
  childNameSelector,
  childRewardsTasksSelector,
  childStateIsLoadingSelector,
  childActions,
} from 'Redux';
import {REWARD_ITEM_LIMIT} from 'Constants';
import {
  Container,
  Content,
  Footer,
  AvatarContainer,
  ToolbarContainer,
  DefaultTasksContainer,
  DefaultTasks,
} from './styles';

const TasksScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tasks = useSelector(childRewardsTasksSelector);
  const childId = useSelector(childIdSelector);
  const childName = useSelector(childNameSelector);
  const isLoading = useSelector(childStateIsLoadingSelector);

  const handleOnPressContinueButton = () => {
    navigation.navigate(NAV_ROUTES.addTasks);
  };

  const handleOnPressBtnGetStarted = () => {
    dispatch(childActions.setAddChildFlowIsEditig(false));
    navigation.navigate(NAV_ROUTES.bottomTabNavigator);
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
    const message = (
      <Text
        textAlign="center"
        fontSize={14}
        lineHeight={22}
        color={COLORS.Text.black}
        fontWeight="400">
        Let's sprinkle some sunshine
        {'    '}
        into
        <Text
          textAlign="center"
          fontSize={14}
          lineHeight={22}
          color={COLORS.Text.black}
          fontWeight="600"
          style={styles.welcomeText}>
          {` ${childName}'s `}
        </Text>
        day! It's time to
        {'        '}
        set up her special tasks.
      </Text>
    );

    const starImage = (
      <Image source={Images.StarryAuthTasksScreen} width={140} height={160} />
    );

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Content>
          <AvatarContainer>
            <EmptyListState
              message={message}
              footerNote="Here's a peek at what other parents have chosen for their young explorers:"
              starImage={starImage}
              starImageContainer={{marginTop: -90}}
              contentContainerStyle={{paddingVertical: 24}}
            />
            <DefaultTasks>
              {DEFAULT_TASKS.map(task => {
                return (
                  <DefaultTasksContainer>
                    <Image source={Images.Star} width={16} height={16} />
                    <Text
                      textAlign="left"
                      fontSize={15}
                      lineHeight={22}
                      color={COLORS.Text.black}
                      fontWeight="600"
                      marginLeft={8}>
                      {task}
                    </Text>
                  </DefaultTasksContainer>
                );
              })}
            </DefaultTasks>
            <Text
              textAlign="center"
              fontSize={15}
              lineHeight={28}
              color={COLORS.Text.black}
              marginTop={14}
              fontWeight="400"
              marginLeft={30}
              marginRight={30}>
              Ready to watch their accomplishments soar? Let's create their tasks below and bring their sky to life!
            </Text>
            <View style={{
              paddingLeft: 20,
              paddingRight: 20,
              width: '100%',
              paddingBottom: 48,
              marginTop: 30,
            }}>
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
            </View>
          </AvatarContainer>
        </Content>
      </ScrollView>
    );
  };

  const handleOnPressBackButton = () => {
    navigation.navigate(NAV_ROUTES.chooseAvatar, {
      isEditing: true,
      name: childName,
    });
  };

  return (
    <>
      <ScreenBackground cloudType={0}>
        <Container>
          <ToolbarContainer>
            <Toolbar
              title="Tasks"
              onPressBackButton={handleOnPressBackButton}
            />
          </ToolbarContainer>
          {tasks.length > 0 ? renderTaskList : renderWelcomeAvatar()}
        </Container>
      </ScreenBackground>
      {tasks.length > 0 && renderFooter}
      {isLoading && <LoadingIndicator />}
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
