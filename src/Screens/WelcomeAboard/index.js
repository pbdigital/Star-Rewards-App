/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'react-native';
import {
  Button,
  EmptyListState,
  Image,
  ScreenBackground,
  Text,
} from 'Components';
import {COLORS, NAV_ROUTES} from 'Constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from 'src/Assets/Images';
import {useSelector} from 'react-redux';
import {userInforSelector} from 'Redux';
import {startCase} from 'lodash';
import {Container, Content, Footer} from './styles';
import {useNavigation} from '@react-navigation/native';

const WelcomeAboardScreen = () => {
  const user = useSelector(userInforSelector);
  const navigation = useNavigation();
  const renderContent = () => (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Content>
        <EmptyListState
          message={
            <Text
              fontSize={20}
              fontWeight="600"
              lineHeight={30}
              textAlign="center"
              color={COLORS.Text.black}>
              Welcome aboard,{'\n'}
              <Text
                fontSize={20}
                fontWeight="600"
                lineHeight={30}
                textAlign="center"
                color={COLORS.Blue}>
                {startCase(user.firstName)}!
              </Text>
            </Text>
          }
          starImage={
            <Image
              source={Images.StarryWelcomeAboard}
              width={148}
              height={160}
            />
          }
          starImageContainer={{marginTop: -90}}
          rightCloudStyle={{right: -10}}
          leftCloudStyle={{left: -10}}
          messageStyle={{top: 60}}
        />
        <Text
          fontSize={15}
          fontWeight="400"
          lineHeight={22}
          textAlign="center"
          marginTop={30}
          marginBottom={16}
          color={COLORS.Text.black}>
          I'm <Text fontWeight="600">Starry</Text>, your cheerful guide through
          the
          {'\n'}
          realm of positive habits and rewards.
          {'\n\n'}
          Together, we're about to embark on an
          {'\n'}
          exciting journey of growth and
          {'\n'}
          achievement for your little star. Whether it's
          {'\n'}
          conquering morning routines or mastering
          {'\n'}
          new skills, I'm here to make it all
          {'\n'}
          supernova-fun!
          {'\n\n'}
          Ready to create a sky full of wonderful
          {'\n'}
          habits and rewards? Let's take off on this
          {'\n'}
          soaring adventure!
        </Text>
      </Content>
    </ScrollView>
  );

  const handleOnPressContinue = () => {
    navigation.navigate(NAV_ROUTES.childNameInput);
  };

  const renderFooter = () => (
    <SafeAreaView
      edges={['bottom']}
      style={{backgroundColor: COLORS.Background.screen}}>
      <Footer>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressContinue}
          title="Continue"
          buttonTitleFontSize={16}
        />
      </Footer>
    </SafeAreaView>
  );

  return (
    <>
      <ScreenBackground cloudType={0}>
        <Container>{renderContent()}</Container>
      </ScreenBackground>
      {renderFooter()}
    </>
  );
};

export {WelcomeAboardScreen};
