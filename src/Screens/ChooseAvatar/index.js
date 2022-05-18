import React from 'react';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Button} from '../../Components/Button';
import {MonsterList} from '../../Components/MonsterList';
import {COLORS} from '../../Constants/Colors';
import {Container, Content, Footer} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Toolbar} from '../../Components/Toolbar';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';

const ChooseAvatarScreen = () => {
  const navigation = useNavigation();

  const handleOnPressContinueButton = () => {
    navigation.navigate(NAV_ROUTES.tasks);
  };

  const renderFooter = () => (
    <SafeAreaView
      edges={['bottom']}
      style={{backgroundColor: COLORS.Background}}>
      <Footer>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressContinueButton}
          title="Continue"
          buttonTitleFontSize={16}
        />
      </Footer>
    </SafeAreaView>
  );

  return (
    <>
      <ScreenBackground cloudType={2}>
        <Container paddingLeft={20} paddingRight={20}>
          <Toolbar title="Choose an avatar" />
          <Content>
            <MonsterList />
          </Content>
        </Container>
      </ScreenBackground>
      {renderFooter()}
    </>
  );
};

export {ChooseAvatarScreen};
