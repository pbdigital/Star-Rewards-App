import React, {useCallback, useEffect, useState} from 'react';
import {Button, Image, ScreenBackground, Text, Toolbar} from '../../Components';
import {useDispatch} from 'react-redux';
import {COLORS} from '../../Constants';
import {Images} from '../../Assets/Images';
import {useRoute} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
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
} from './styles';

const AddTaskChildTaskSelectorScreen = () => {
  const route = useRoute();
  const {child} = route.params ?? {};
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!child) return;
    getChildTask();
  }, [child]);

  const getChildTask = useCallback(async () => {
    const childId = child?.id;
    const time = moment().format();
    const result = await ChildService.getChildTasks({childId, time});
    const {tasks: taskResult} = result?.data;
    let childTask = [];
    if (taskResult && taskResult.length > 0) childTask = taskResult;
    setTasks(childTask);
  }, [child]);

  const handleOnPressCopyTask = useCallback(() => {
    console.log('handleOnPressCopyTask', {selectedTasks});
  }, [selectedTasks]);

  const renderItem = useCallback(
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

  return (
    <View style={{flex: 1}}>
      <ScreenBackground cloudType={0}>
        <Container>
          <Toolbar title="Copy Tasks" />
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
              {child?.firstName}'s tasks
            </Text>
            <TouchableOpacity>
              <Text
                fontSize={18}
                fontWeight="500"
                lineHeight="28"
                color={COLORS.Green}
                textAlign="left">
                Select All
              </Text>
            </TouchableOpacity>
          </ListHeader>
          <List data={tasks ?? []} renderItem={renderItem} />
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
    </View>
  );
};

export {AddTaskChildTaskSelectorScreen};
