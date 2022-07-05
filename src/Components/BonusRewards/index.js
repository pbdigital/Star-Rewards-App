import React, {useCallback} from 'react';
import {ScrollView} from 'react-native';
import {AvatarSpeaking, BubblePosition} from '../AvatarSpeaking';
import {StyleSheet} from 'react-native';
import {COLORS} from 'Constants';
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
import {CloudBackgroundLeftOverRight} from '../ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundLeftOverRight';
import {
  childBonusTasksSelector,
  childNameSelector,
} from 'Redux';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from 'Constants';
import {TaskStarList} from '../TaskStarList';

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
        {tasks?.length < 5 && (
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Blue}
            shadowColor={COLORS.BlueShadow}
            onPress={handleOnPressBonusStars}
            title="Bonus Stars"
            buttonTitleFontSize={16}
            leftIcon={<Image source={Images.IcAdd} width={24} height={24} />}
          />
        )}
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressCliamButton}
          title="Claim Reward"
          buttonTitleFontSize={16}
          marginTop={10}
        />
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
          Text for bonus screen{'\n'}goes here
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
        to get{'\n'}done?
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
            <AvatarSpeaking
              message={avatarSpeakText}
              bubblePosition={BubblePosition.top}
            />
            <CloudBackgroundLeftOverRight
              contentContainerStyle={styles.cloudBackground}
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
});

export {BonusRewards};
