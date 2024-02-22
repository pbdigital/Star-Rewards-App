import React, {useCallback, useEffect, useState} from 'react';
import {
  AddTaskChildNoTasksModal,
  Button,
  CopyTaskProcessModal,
  Image,
  LoadingIndicator,
  ScreenBackground,
  Text,
  Toolbar,
} from '../../Components';
import {COLORS, NAV_ROUTES} from '../../Constants';
import {Images} from '../../Assets/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {ChildService} from '../../Services';
import {taskFrequency} from '../../Helpers';
import {
  AddTaskBullet,
  Container,
  FooterContainer,
  List,
  ListHeader,
  ItemContainer,
  ItemMetaDataContainer,
  StarsAwardedContainer,
} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {childActions, childIdSelector} from '../../Redux';

const AddTaskChildTaskSelectorScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const {child, isBonusTasks} = route.params ?? {};
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [bonusTasks, setBonusTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllTasksSelected, setIsAllTaskSelected] = useState(false);
  const [showNoTaskModal, setShowNoTaskModal] = useState(false);
  const [showCopyTaskProcessModal, setShowCopyTaskProcessModal] =
    useState(false);
  const [isSuccessfulTransaction, setIsSuccessfulTransaction] = useState(false);
  const selectedChildId = useSelector(childIdSelector);

  useEffect(() => {
    if (!child) return;
    getChildTask();
  }, [child]);

  useEffect(() => {
    console.log('hohoho', {bonusTasks})
    const userTasks = isBonusTasks ? bonusTasks : tasks;
    if (!selectedTasks && !userTasks) return;
    const numSelectedTasks = selectedTasks?.length;
    const numTasks = userTasks?.length;
    if (numTasks === 0 || numSelectedTasks === 0) {
      setIsAllTaskSelected(false);
      return;
    }

    console.log('GOGOOGOOGOG', {numTasks, numSelectedTasks});
    setIsAllTaskSelected(numTasks === numSelectedTasks);
  }, [selectedTasks, tasks, isBonusTasks, bonusTasks]);

  const getChildTask = useCallback(async () => {
    setIsLoading(true);
    const childId = child?.id;
    const time = moment().format();
    const result = await ChildService.getChildTasks({childId, time});
    const {tasks: taskResult, bonusTasks: bonusTasksResult} = result?.data;
    console.log({bonusTasksResult})
    let childTask = [];
    let childBonusTasks = [];
    if (taskResult && taskResult.length > 0) childTask = taskResult;
    if (bonusTasksResult && bonusTasksResult.length > 0) childBonusTasks = bonusTasksResult;
    setTasks(childTask);
    setBonusTasks(bonusTasksResult);
    setIsLoading(false);
    if (isBonusTasks && childBonusTasks.length === 0) {
      setShowNoTaskModal(true);
      return;
    }
    if (!isBonusTasks && childTask.length === 0) {
      setShowNoTaskModal(true);
    }
  }, [child, isBonusTasks]);

  const handleOnPressCopyTask = useCallback(async () => {
    setShowCopyTaskProcessModal(true);
    const params = {
      childId: selectedChildId,
      tasks: selectedTasks,
    };
    const {payload} = await dispatch(childActions.copyChildTask(params));
    setIsSuccessfulTransaction(payload.success);
    if (!payload.success) {
      setShowCopyTaskProcessModal(false);
      Alert.alert('', 'Unable to create child task. Please try again later');
    }
  }, [selectedTasks, selectedChildId]);

  const renderTaskItem = useCallback(
    ({item: task, index}) => {
      const handleOnPressItem = () => {
        const clonedTasks = [...selectedTasks];
        if (!clonedTasks.includes(task)) {
          clonedTasks.push(task);
        } else {
          clonedTasks.splice(clonedTasks.indexOf(task), 1);
        }
        setSelectedTasks(clonedTasks);
      };
      const frequency = taskFrequency({
        daysofWeek: task?.daysofWeek,
      });
      return (
        <ItemContainer onPress={handleOnPressItem}>
          <ItemMetaDataContainer>
            <Text
              fontSize={18}
              fontWeight="500"
              lineHeight="27"
              color={COLORS.Text.black}
              marginBottom={4}
              numberOfLines={2}>
              {task?.name}
            </Text>
            <Text
              fontSize={14}
              fontWeight="400"
              lineHeight="21"
              color={COLORS.Blue}>
              {frequency}
            </Text>
          </ItemMetaDataContainer>
          {selectedTasks.includes(task) ? (
            <Image
              source={Images.IcRadioButtonSelected}
              width={24}
              height={24}
            />
          ) : (
            <AddTaskBullet />
          )}
        </ItemContainer>
      );
    },
    [selectedTasks],
  );

  const renderBonusStarItem = useCallback(
    ({item: bonusStar, index}) => {
      const handleOnPressItem = () => {
        const clonedTasks = [...selectedTasks];
        if (!clonedTasks.includes(bonusStar)) {
          clonedTasks.push(bonusStar);
        } else {
          clonedTasks.splice(clonedTasks.indexOf(bonusStar), 1);
        }
        setSelectedTasks(clonedTasks);
      };
      return (
        <ItemContainer onPress={handleOnPressItem}>
          <ItemMetaDataContainer>
            <Text
              fontSize={18}
              fontWeight="500"
              lineHeight="27"
              color={COLORS.Text.black}
              marginBottom={4}
              numberOfLines={2}>
              {bonusStar?.name}1
            </Text>
            <StarsAwardedContainer>
              <Image source={Images.Star} width={16} height={16} />
              <Text
                fontSize={14}
                fontWeight="400"
                lineHeight="21"
                marginLeft={5}
                color={COLORS.Blue}>
                {`x${bonusStar.starsAwarded}`}
              </Text>
            </StarsAwardedContainer>
          </ItemMetaDataContainer>
          {selectedTasks.includes(bonusStar) ? (
            <Image
              source={Images.IcRadioButtonSelected}
              width={24}
              height={24}
            />
          ) : (
            <AddTaskBullet />
          )}
        </ItemContainer>
      );
    },
    [selectedTasks],
  );

  const renderItem = useCallback(
    ({item: task, index}) => {
      return isBonusTasks
        ? renderBonusStarItem({item: task, index})
        : renderTaskItem({item: task, index});
    },
    [renderTaskItem, isBonusTasks, renderBonusStarItem],
  );

  const handleToggleTaskSelector = useCallback(() => {
    if (isAllTasksSelected) {
      setSelectedTasks([]);
      return;
    }
    const userTask = isBonusTasks ? bonusTasks : tasks;
    setSelectedTasks([...userTask]);
  }, [isAllTasksSelected, tasks, isBonusTasks, bonusTasks]);

  const navigateToSettings = () => {
    navigation.navigate(NAV_ROUTES.bottomTabNavigator, {
      screen: NAV_ROUTES.settingsStackNavigator,
    });
  };

  const renderSelectAllToggleButton = useCallback(() => {
    const userTasks = isBonusTasks ? bonusTasks : tasks;
    if (userTasks?.length > 0) {
      return (
        <TouchableOpacity onPress={handleToggleTaskSelector}>
          <Text
            fontSize={18}
            fontWeight="500"
            lineHeight="28"
            color={COLORS.Green}
            textAlign="left">
            {isAllTasksSelected ? 'Select None' : 'Select All'}
          </Text>
        </TouchableOpacity>
      );
    }
  }, [
    isBonusTasks,
    bonusTasks,
    tasks,
    handleToggleTaskSelector,
    isAllTasksSelected,
  ]);

  return (
    <View style={{flex: 1}}>
      <ScreenBackground cloudType={0}>
        <Container>
          <Toolbar title={isBonusTasks ? 'Copy Bonus Stars' : 'Copy Tasks'} />
          <Text
            fontSize={16}
            fontWeight="400"
            lineHeight="28"
            color={COLORS.Text.black}
            marginTop={10}
            textAlign="center">
            Select item you want to copy.
          </Text>
          <ListHeader>
            <Text
              fontSize={18}
              fontWeight="600"
              lineHeight="27"
              color={COLORS.Text.black}
              textAlign="left">
              {child?.firstName}'s {isBonusTasks ? 'Bonus Stars' : 'tasks'}
            </Text>
            {renderSelectAllToggleButton()}
          </ListHeader>
          <List
            data={isBonusTasks ? bonusTasks : tasks}
            renderItem={renderItem}
          />
        </Container>
      </ScreenBackground>
      <FooterContainer>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressCopyTask}
          title="Copy Tasks"
          buttonTitleFontSize={16}
          disabled={selectedTasks?.length <= 0}
        />
      </FooterContainer>
      <CopyTaskProcessModal
        isVisible={showCopyTaskProcessModal}
        onClose={navigateToSettings}
        isSuccess={isSuccessfulTransaction}
      />
      <AddTaskChildNoTasksModal
        isVisible={showNoTaskModal}
        onClose={() => navigation.goBack()}
      />
      {isLoading && <LoadingIndicator />}
    </View>
  );
};

export {AddTaskChildTaskSelectorScreen};
