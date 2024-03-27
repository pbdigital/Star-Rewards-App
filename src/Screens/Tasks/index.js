import React, {useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  COLORS,
  DEFAULT_TASKS,
  IapLandingScreenContent,
  RESTRICTIONS,
} from 'Constants';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
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
} from 'AppReduxState';
import {REWARD_ITEM_LIMIT} from 'Constants';
import {
  Container,
  Content,
  Footer,
  AvatarContainer,
  ToolbarContainer,
  DefaultTasksContainer,
  DefaultTasks,
  TaskContainer,
} from './styles';
import {isTutorialDoneSelector} from 'AppReduxState';
import {useInAppPurchaseProvider} from 'ContextProviders';

const TasksScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const tasks = useSelector(childRewardsTasksSelector);
  const childId = useSelector(childIdSelector);
  const childName = useSelector(childNameSelector);
  const isLoading = useSelector(childStateIsLoadingSelector);
  const isDoneTutorial = useSelector(isTutorialDoneSelector);
  const {isVip, numberOfRewardTasks} = useInAppPurchaseProvider();

  const handleOnPressContinueButton = () => {
    if (!isVip && numberOfRewardTasks >= RESTRICTIONS.tasks) {
      navigation.navigate(NAV_ROUTES.landingOfferScreen, {
        content: IapLandingScreenContent.tasks,
      });
      return;
    }
    navigation.navigate(NAV_ROUTES.addTasks);
  };

  useEffect(() => {
    dispatch(childActions.setIsLoading(false));
  }, [isFocused, dispatch]);

  const handleOnPressBtnGetStarted = () => {
    const resetNavigation = routeName => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: routeName,
            },
          ],
        }),
      );
    };
    dispatch(childActions.setAddChildFlowIsEditig(false));
    if (isDoneTutorial) {
      resetNavigation(NAV_ROUTES.bottomTabNavigator);
      return;
    }
    resetNavigation(NAV_ROUTES.quickTutorial);
  };

  useEffect(() => {
    if (childId) {
      const payload = {
        childId,
        time: moment().format(),
      };
      dispatch(childActions.getChildTasks(payload));
    }
  }, [childId, dispatch]);

  const renderFooter = useMemo(
    () => (
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
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tasks],
  );

  const renderTaskList = useMemo(() => {
    const renderItem = ({item}) => (
      <View style={styles.listItemContaienr}>
        <ChildTasksListItem {...item} marginBottom={16} />
      </View>
    );

    return (
      <ScrollView contentContainerStyle={styles.listContainer}>
        <View style={TaskContainer}>
          {tasks.map((task, index) => renderItem({item: task}))}
        </View>
        <View>
          <EmptyListState
            message={
              "You can add up to 5 tasks!\nBut if you want to get started quickly, you can always add more tasks later. Your child's journey to success is just a tap away."
            }
            footerNote=""
            starImage={
              <Image
                source={Images.StarryHasTaskList}
                width={140}
                height={150}
              />
            }
            starImageContainer={{marginTop: -60}}
            contentContainerStyle={styles.listEmptyStateContentContainer}
            messageStyle={styles.listEmptyStateMessage}
          />
          {renderFooter}
        </View>
      </ScrollView>
    );
  }, [tasks, renderFooter]);

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
          fontFamily="Poppins-SemiBold"
          style={styles.welcomeText}>
          {` ${childName}'s `}
        </Text>
        day! It's time to set up their special tasks.
      </Text>
    );

    const starImage = (
      <Image source={Images.StarryAuthTasksScreen} width={140} height={160} />
    );

    return (
      <ScrollView contentContainerStyle={styles.root}>
        <Content>
          <AvatarContainer>
            <EmptyListState
              message={message}
              footerNote="Here's a peek at what other parents have chosen for their young explorers:"
              starImage={starImage}
              starImageContainer={styles.starImageContainer}
              contentContainerStyle={styles.starImageContentContainer}
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
                      fontFamily="Poppins-SemiBold"
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
              Ready to watch their accomplishments soar? Let's create their
              tasks below and bring their sky to life!
            </Text>
            <View style={styles.btnAddTaskContainer}>
              <Button
                borderRadius={16}
                titleColor={COLORS.White}
                buttonColor={COLORS.Blue}
                shadowColor={COLORS.BlueShadow}
                onPress={handleOnPressContinueButton}
                title="Add Task"
                buttonTitleFontSize={16}
                leftIcon={
                  <Image source={Images.IcAdd} width={24} height={24} />
                }
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
      {isLoading && <LoadingIndicator />}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {},
  list: {
    marginTop: 30,
    marginBottom: 16,
  },
  btnAddTaskContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    paddingBottom: 48,
    marginTop: 30,
  },
  listItemContaienr: {
    marginHorizontal: 20,
  },
  listEmptyStateMessage: {
    marginTop: -18,
    marginLeft: -8,
  },
  listEmptyStateContentContainer: {
    paddingVertical: 24,
  },
  listContainer: {
    paddingTop: 23,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  root: {
    flexGrow: 1,
  },
  starImageContainer: {
    marginTop: -90,
  },
  starImageContentContainer: {
    paddingVertical: 24,
  },
});

export {TasksScreen};
