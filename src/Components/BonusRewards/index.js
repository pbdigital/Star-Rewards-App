import React, {useCallback, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {AvatarSpeaking, BubblePosition} from '../AvatarSpeaking';
import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_HELP_MESSAGES} from 'Constants';
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
import {
  childBonusTasksSelector,
  childNameSelector,
  isReadOnlySelector,
} from 'AppReduxState';
import {EmptyListState} from '../EmptyListState';
import {LIST_TYPE, STAR_LIST_TYPE} from '../../Constants';
import {HelpModal, PageHeaderTitle} from '..';
import {childBonusStarViewTypeSelector} from '../../AppReduxState';

const BonusRewards = ({onRefresh: onBonusRefresh}) => {
  const navigation = useNavigation();
  const childName = useSelector(childNameSelector);
  const tasks = useSelector(childBonusTasksSelector);
  const handleOnPressBonusStars = () => {
    navigation.navigate(NAV_ROUTES.addBonusTasks);
  };
  const bonusStarsViewListType = useSelector(childBonusStarViewTypeSelector);
  const isReadOnly = useSelector(isReadOnlySelector);
  const [refreshing, setRefreshing] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const renderFooter = () => (
    <SafeAreaFooter edges={['bottom']}>
      <Footer>
        {tasks?.length === 0 && (
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Blue}
            shadowColor={COLORS.BlueShadow}
            onPress={handleOnPressBonusStars}
            title="Add Bonus Stars"
            buttonTitleFontSize={16}
            marginBottom={30}
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
  }, [tasks, childName]);

  const onRefresh = () => {
    setRefreshing(true);
    if (onBonusRefresh) {
      onBonusRefresh();
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const handleOnPressGiveBonusStar = () => {
    navigation.navigate(NAV_ROUTES.oneOffStars);
  };

  const helpModalClose = () => setShowHelpModal(false);
  const helpModalOpen = () => setShowHelpModal(true);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <Content>
        <PageHeaderTitle
          title="Bonus Stars"
          subTitle="Celebrate those moments of unexpected kindness, extra effort, and wonderful behavior by awarding Bonus Stars."
          onPressHelpButton={helpModalOpen}
        />
        {tasks?.length > 0 ? (
          <ListContainer>
            <TaskStarList
              type={STAR_LIST_TYPE.bonus}
              tasks={tasks}
              showOneOffStar
            />
            <Footer
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                marginTop: bonusStarsViewListType === LIST_TYPE.stars ? 30 : 0,
              }}>
              {!isReadOnly && (
                <Button
                  borderRadius={16}
                  titleColor={COLORS.White}
                  buttonColor={COLORS.Blue}
                  shadowColor={COLORS.BlueShadow}
                  onPress={handleOnPressGiveBonusStar}
                  title="Give Bonus Stars"
                  buttonTitleFontSize={16}
                  marginBottom={20}
                  leftIcon={
                    <Image source={Images.IcAdd} width={24} height={24} />
                  }
                />
              )}
              <AvatarSpeaking
                message={avatarSpeakText}
                bubblePosition={BubblePosition.right}
              />
            </Footer>
          </ListContainer>
        ) : (
          <AvatarWelcomeContainer>
            <EmptyListState
              message="Celebrate those moments of unexpected kindness, extra effort, and wonderful behavior by awarding Bonus Stars. "
              footerNote={
                isReadOnly
                  ? ''
                  : "Simply tap the 'Add Bonus Stars' button to honor your little star's actions. You can choose how many stars to give to make their achievements shine bright. Remember, these aren't just any stars – they're your way of saying I noticed and I'm proud of you!"
              }
              starImage={
                <Image source={Images.NoBonusStar} height={160} width={180} />
              }
              containerFlex={1}
            />
          </AvatarWelcomeContainer>
        )}
      </Content>

      {!isReadOnly && renderFooter()}
      <HelpModal
        title={SCREEN_HELP_MESSAGES.bonusStars.title}
        content={SCREEN_HELP_MESSAGES.bonusStars.message}
        headerImage={
          <Image
            source={SCREEN_HELP_MESSAGES.bonusStars.headerImage.source}
            width={SCREEN_HELP_MESSAGES.bonusStars.headerImage.width}
            height={SCREEN_HELP_MESSAGES.bonusStars.headerImage.height}
            resizeMode="contain"
          />
        }
        isVisible={showHelpModal}
        onClose={helpModalClose}
      />
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
