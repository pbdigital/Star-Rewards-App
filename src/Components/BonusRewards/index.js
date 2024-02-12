import React, {useCallback, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {AvatarSpeaking, BubblePosition} from '../AvatarSpeaking';
import {StyleSheet} from 'react-native';
import {COLORS, REWARD_ITEM_LIMIT} from 'Constants';
import {Button} from '../Button';
import {
  Content,
  AvatarWelcomeContainer,
  Footer,
  SafeAreaFooter,
  ListContainer,
} from './styles';
import {useSelector} from 'react-redux';
import {Text} from '../Text';
import {Image} from '../Image';
import {Images} from 'Assets/Images';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from 'Constants';
import {TaskStarList} from '../TaskStarList';
import {childBonusTasksSelector, childNameSelector} from 'Redux';
import {EmptyListState} from '../EmptyListState';

const BonusRewards = ({onRefresh: onBonusRefresh}) => {
  const navigation = useNavigation();
  const childName = useSelector(childNameSelector);
  const tasks = useSelector(childBonusTasksSelector);
  const handleOnPressCliamButton = () => {
    navigation.navigate(NAV_ROUTES.rewards);
  };
  const handleOnPressBonusStars = () => {
    navigation.navigate(NAV_ROUTES.addBonusTasks);
  };
  const [refreshing, setRefreshing] = useState(false);

  const renderFooter = () => (
    <SafeAreaFooter edges={['bottom']}>
      <Footer>
        {tasks?.length < REWARD_ITEM_LIMIT && (
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Blue}
            shadowColor={COLORS.BlueShadow}
            onPress={handleOnPressBonusStars}
            title="Add Bonus Stars"
            buttonTitleFontSize={16}
            leftIcon={<Image source={Images.IcAdd} width={24} height={24} />}
          />
        )}
      </Footer>
    </SafeAreaFooter>
  );

  const avatarSpeakText = useCallback(() => {
    if (tasks?.length > 0) {
      return (
        <Text
          textAlign="center"
          fontSize={16}
          lineHeight={24}
          color={COLORS.Text.grey}
          fontWeight="400">
          How many bonus stars will you collect today?
        </Text>
      );
    }

    return (
      <Text
        textAlign="center"
        fontSize={16}
        lineHeight={24}
        color={COLORS.Text.grey}
        fontWeight="400">
        What bonus tasks do{'\n'}you want
        <Text
          textAlign="center"
          fontSize={16}
          lineHeight={24}
          color={COLORS.Text.grey}
          fontWeight="600">
          {` ${childName} `}
        </Text>
        {'\n'}
        to do?
      </Text>
    );
  }, [tasks]);

  const onRefresh = () => {
    setRefreshing(true);
    if (onBonusRefresh) {
      onBonusRefresh();
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <Content>
        <Text
          textAlign="center"
          fontSize={24}
          lineHeight={26}
          color={COLORS.Text.black}
          fontWeight="600">
          Bonus Stars
        </Text>
        {tasks?.length > 0 ? (
          <ListContainer>
            <TaskStarList type="bonus" tasks={tasks} showOneOffStar />
            <AvatarSpeaking
              message={avatarSpeakText}
              bubblePosition={BubblePosition.right}
            />
          </ListContainer>
        ) : (
          <AvatarWelcomeContainer>
            <EmptyListState
              message="Celebrate those moments of unexpected kindness, extra effort, and wonderful behavior by awarding Bonus Stars. "
              footerNote="Simply tap the 'Add Bonus Stars' button to honor your little star's actions. You can choose how many stars to give to make their achievements shine bright. Remember, these aren't just any stars – they're your way of saying I noticed and I'm proud of you!"
              starImage={
                <Image source={Images.NoBonusStar} height={160} width={180} />
              }
              containerFlex={1}
            />
          </AvatarWelcomeContainer>
        )}
      </Content>
      {renderFooter()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cloudBackground: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -105}],
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  cloudImageRight: {
    position: 'absolute',
    top: 0,
    right: -25,
  },
  cloudImageLeft: {
    position: 'absolute',
    top: 170,
    left: 0,
  },
  welcomeText: {
    position: 'absolute',
    top: 55,
    left: 0,
    width: '100%',
  },
});

export {BonusRewards};
