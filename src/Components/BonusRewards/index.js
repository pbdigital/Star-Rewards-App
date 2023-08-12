import React, {useCallback} from 'react';
import {ScrollView} from 'react-native';
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
  WelcomeContainer,
} from './styles';
import {useSelector} from 'react-redux';
import {Text} from '../Text';
import {Image} from '../Image';
import {Images} from 'Assets/Images';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from 'Constants';
import {TaskStarList} from '../TaskStarList';
import {CloudImage} from '../CloudImage';
import {childBonusTasksSelector, childNameSelector} from 'Redux';

const BonusRewards = () => {
  const navigation = useNavigation();
  const childName = useSelector(childNameSelector);
  const tasks = useSelector(childBonusTasksSelector);
  const handleOnPressCliamButton = () => {
    navigation.navigate(NAV_ROUTES.rewards);
  };
  const handleOnPressBonusStars = () => {
    navigation.navigate(NAV_ROUTES.addBonusTasks);
  };

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

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
            <TaskStarList tasks={tasks} />
            <AvatarSpeaking
              message={avatarSpeakText}
              bubblePosition={BubblePosition.right}
            />
          </ListContainer>
        ) : (
          <AvatarWelcomeContainer>
            <WelcomeContainer>
              <CloudImage style={styles.cloudImageRight} />
              <Image
                source={Images.NoBonusTextCloud}
                height={229}
                width={328}
              />
              <Text
                textAlign="center"
                fontSize={14}
                lineHeight={22}
                color={COLORS.Text.black}
                fontWeight="400"
                style={styles.welcomeText}>
                Time for extra twinkles! Add a{'\n'}
                burst of bonus stars to your
                {'\n'}
                child's sky as a delightful surprise
                {'\n'}
                or a well-deserved treat.
              </Text>
              <Image
                source={Images.NoBonusStar}
                height={160}
                width={180}
                style={{marginTop: -75}}
              />
              <CloudImage style={styles.cloudImageLeft} />
              <Text
                textAlign="center"
                fontSize={16}
                lineHeight={28}
                color={COLORS.Text.black}
                marginTop={26}
                fontWeight="400">
                Add a bonus task and watch as their sky
                {'\n'}
                lights up with even more brilliance. Don't
                {'\n'}
                forget to set the number of stars they'll
                {'\n'}
                earn as a sparkling bonus.
              </Text>
            </WelcomeContainer>
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
