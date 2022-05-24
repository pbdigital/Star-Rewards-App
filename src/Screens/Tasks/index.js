import React, {useEffect, useMemo} from 'react';
import {FlatList, Text} from 'react-native';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Button} from '../../Components/Button';
import {COLORS} from '../../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Toolbar} from '../../Components/Toolbar';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {Image} from '../../Components/Image';
import {Images} from '../../Assets/Images';
import {Bubble} from '../../Components';
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

const TasksScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const avatar = useSelector(({child}) => child.avatar);
  const tasks = useSelector(({child}) => child.tasks);
  const childId = useSelector(({child}) => child.childId);

  const handleOnPressContinueButton = () => {
    navigation.navigate(NAV_ROUTES.addTasks);
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

  useEffect(() => {
    console.log('CHILD TASKS', {tasks});
  }, [tasks]);

  const renderFooter = () => (
    <SafeAreaView
      edges={['bottom']}
      style={{backgroundColor: COLORS.Background}}>
      <Footer>
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
      </Footer>
    </SafeAreaView>
  );

  const renderTaskList = useMemo(() => {
    return (
      <Content>
        <FlatList
          // contentContainerStyle={styles.contentContainerStyle}
          // columnWrapperStyle={styles.columnWrapperStyle}
          // style={styles.list}
          data={tasks}
          keyExtractor={item => `child-task-${item.name}`}
          renderItem={({item}) => {
            return <Text>{item?.name}</Text>;
          }}
        />
      </Content>
    );
  }, [tasks]);

  const renderWelcomeAvatar = () => {
    return (
      <Content>
        <Bubble marginBottom={34} />
        <AvatarContainer>
          {avatar && (
            <Image
              source={avatar.image}
              height={140}
              width={140}
              marginTop={34}
            />
          )}
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
      {renderFooter()}
    </>
  );
};

export {TasksScreen};
