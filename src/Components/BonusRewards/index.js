import React from 'react';
import {AvatarSpeaking, BubblePosition} from '../AvatarSpeaking';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../Constants/Colors';
import {Button} from '../Button';
import {
  Content,
  AvatarWelcomeContainer,
  Footer,
  SafeAreaFooter,
} from './styles';
import {useSelector} from 'react-redux';
import {Text} from '../Text';
import {Image} from '../Image';
import {Images} from '../../Assets/Images';
import {CloudBackgroundLeftOverRight} from '../ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundLeftOverRight';
import {childNameSelector} from '../../Redux/Child/ChildSelectors';

const BonusRewards = () => {
  const childName = useSelector(childNameSelector);
  const handleOnPressCliamButton = () => {};
  const handleOnPressBonusStars = () => {};

  const renderFooter = () => (
    <SafeAreaFooter edges={['bottom']}>
      <Footer>
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

  const avatarSpeakWelcomeText = () => {
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
  };

  return (
    <>
      <Content>
        <Text
          textAlign="center"
          fontSize={24}
          lineHeight={26}
          color={COLORS.Text.black}
          fontWeight="600">
          Bonus Stars
        </Text>
        <AvatarWelcomeContainer>
          <AvatarSpeaking
            message={avatarSpeakWelcomeText}
            bubble={BubblePosition.top}
          />
          <CloudBackgroundLeftOverRight
            contentContainerStyle={styles.cloudBackground}
          />
        </AvatarWelcomeContainer>
      </Content>
      {renderFooter()}
    </>
  );
};

const styles = StyleSheet.create({
  cloudBackground: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -105}],
  },
});

export {BonusRewards};
