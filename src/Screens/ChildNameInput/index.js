import React from 'react';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Text} from '../../Components/Text';
import {Button} from '../../Components/Button';
import {COLORS} from '../../Constants/Colors';
import {Container, Content, TextInput, Footer} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';

const ChildNameInputScreen = () => {
  const navigation = useNavigation();

  const handleOnPressContinueButton = () => {
    navigation.navigate(NAV_ROUTES.chooseAvatar);
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

  const renderContent = () => (
    <Content>
      <Text textAlign="center" fontSize={24} fontWeight="600" lineHeight={36}>
        {'What is the name of\nyour child?'}
      </Text>
      <TextInput autoFocus selectionColor={COLORS.Blue} />
    </Content>
  );

  return (
    <>
      <ScreenBackground>
        <Container paddingLeft={20} paddingRight={20}>
          {renderContent()}
        </Container>
      </ScreenBackground>
      {renderFooter()}
    </>
  );
};

export {ChildNameInputScreen};
