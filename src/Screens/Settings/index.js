import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from '../../Assets/Images';
import {isEmpty} from 'lodash';
import {
  Button,
  Image,
  ImageChildAvatar,
  Toolbar,
  Text,
  ChildTasksListItem,
  AppTextInput,
  ListSwipeControlButtons,
} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {
  childBonusTasksSelector,
  childNameSelector,
  childRewardsTasksSelector,
} from '../../Redux/Child/ChildSelectors';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  Root,
  Container,
  Content,
  AvatarContainer,
  AvatarChangeButton,
  LabelContainer,
  SmallAddIconButton,
  ListWrapper,
  Padded,
} from './styles';

const Label = ({value, showAddButton, marginTop, marginBottom}) => (
  <LabelContainer marginTop={marginTop} marginBottom={marginBottom}>
    <Text
      fontSize={18}
      lineHeight={27}
      fontWeight="600"
      textAlign="center"
      color={COLORS.Text.black}>
      {value}
    </Text>
    {showAddButton && (
      <SmallAddIconButton>
        <Image source={Images.IcAdd} width={14} height={14} />
      </SmallAddIconButton>
    )}
  </LabelContainer>
);

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const childName = useSelector(childNameSelector);
  const rewardsTasks = useSelector(childRewardsTasksSelector);
  const bonusTasks = useSelector(childBonusTasksSelector);

  const [isLoading, setIsLoading] = useState(false);
  const [nameInputVal, setNameInputVal] = useState('');
  const [childNameInputError, setChildNameInputError] = useState(null);

  useEffect(() => {
    setNameInputVal(childName);
  }, [childName]);

  const handleOnTaskNameChange = val => {
    setChildNameInputError(null);
    setNameInputVal(val);
  };

  const handleOnPressSaveButton = async () => {
    if (isEmpty(nameInputVal)) {
      setChildNameInputError('Please enter the task name.');
      return;
    }

    setIsLoading(true);
    // TODO:
    // implement update child name endpoint
    setIsLoading(false);
  };

  const renderItem = ({index, item}, rowMap) => {
    const fromTaskList = item?.isBonusTask ? bonusTasks : rewardsTasks;
    let isLast = index === fromTaskList.length - 1;
    return (
      <Padded>
        <ChildTasksListItem
          {...item}
          hideCloseButton={true}
          marginTop={0}
          marginBottom={isLast ? 0 : 16}
        />
      </Padded>
    );
  };

  const renderHiddenItem = ({item}, rowMap) => {
    return (
      <Padded>
        <ListSwipeControlButtons
          key={`${item.challenge}-index-controls`}
          challenge={item}
          onPressDangerButton={() => {}}
        />
      </Padded>
    );
  };

  return (
    <Root>
      <Container>
        <Toolbar
          title="Settings"
          iconRight={<Image source={Images.IcClock} width={28} height={25} />}
        />
        <Content>
          <AvatarChangeButton>
            <AvatarContainer>
              <ImageChildAvatar width={60} height={60} />
            </AvatarContainer>
            <Text
              fontSize={18}
              lineHeight={27}
              fontWeight="500"
              textAlign="center"
              marginTop={8}
              color={COLORS.Blue}>
              Choose avatar
            </Text>
          </AvatarChangeButton>
          <Padded>
            <AppTextInput
              label="Name"
              onChangeText={handleOnTaskNameChange}
              errorMessage={childNameInputError}
              value={nameInputVal}
              style={styles.textInput}
            />
          </Padded>
          <Padded>
            <Label
              showAddButton
              marginTop={40}
              marginBottom={23}
              value="Current Tasks"
              onPressAddButton={() => {}}
            />
          </Padded>
          <ListWrapper>
            <SwipeListView
              data={rewardsTasks}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={0}
              rightOpenValue={-120}
            />
          </ListWrapper>
          <Padded>
            <Label
              showAddButton
              marginTop={40}
              marginBottom={23}
              value="Bonus Stars"
              onPressAddButton={() => {}}
            />
          </Padded>
          <ListWrapper>
            <SwipeListView
              data={bonusTasks}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={0}
              rightOpenValue={-120}
            />
          </ListWrapper>
        </Content>
        <Padded>
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Green}
            shadowColor={COLORS.GreenShadow}
            onPress={handleOnPressSaveButton}
            title="Save"
            buttonTitleFontSize={16}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </Padded>
      </Container>
    </Root>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    color: COLORS.Text.grey,
    fontWeight: '400',
  },
});

export {SettingsScreen};
