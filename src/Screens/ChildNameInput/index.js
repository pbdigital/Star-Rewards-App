import React, {useEffect, useState} from 'react';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Text} from '../../Components/Text';
import {Button} from '../../Components/Button';
import {COLORS} from '../../Constants/Colors';
import {Container, Content, TextInput, Footer} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {useDispatch, useSelector} from 'react-redux';
import {childActions} from '../../Redux/Child/ChildSlice';
import {isEmpty} from 'lodash';

const ChildNameInputScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const childName = useSelector(({child}) => child.childName);
  const [isBtnContinueDisabled, setIsBtnContinueDisabled] = useState(true);

  useEffect(() => {
    setIsBtnContinueDisabled(isEmpty(childName));
  }, [childName]);

  const handleOnPressContinueButton = () => {
    navigation.navigate(NAV_ROUTES.chooseAvatar);
  };

  const handleOnChildNameInputChange = val => {
    dispatch(childActions.setChildName(val.trim()));
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
          onPress={handleOnPressContinueButton}
          title="Continue"
          value={childName}
          buttonTitleFontSize={16}
          disabled={isBtnContinueDisabled}
        />
      </Footer>
    </SafeAreaView>
  );

  const renderContent = () => (
    <Content>
      <Text textAlign="center" fontSize={24} fontWeight="600" lineHeight={36}>
        {'What is the name of\nyour child?'}
      </Text>
      <TextInput
        autoFocus
        selectionColor={COLORS.Blue}
        onChangeText={handleOnChildNameInputChange}
      />
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
