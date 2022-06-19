import React, {useEffect, useState} from 'react';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Text} from '../../Components/Text';
import {Button} from '../../Components/Button';
import {COLORS} from '../../Constants/Colors';
import {Container, Content, TextInput, Footer} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {isEmpty} from 'lodash';
import {Toolbar} from '../../Components';
import {useSelector} from 'react-redux';
import {userInforSelector} from '../../Redux/User/UserSelectors';
import {childStateAddChildFlowIsEditingSelector} from '../../Redux/Child/ChildSelectors';

const ChildNameInputScreen = () => {
  const route = useRoute();
  const {showToolbar} = route?.params || {};
  const navigation = useNavigation();
  const user = useSelector(userInforSelector);
  const addChildFlowIsEditing = useSelector(
    childStateAddChildFlowIsEditingSelector,
  );
  const [isBtnContinueDisabled, setIsBtnContinueDisabled] = useState(true);
  const [childName, setChildName] = useState('');

  useEffect(() => {
    if (!user?.token) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: NAV_ROUTES.authNavigationStack,
          },
        ],
      });
    }
  }, [user]);

  useEffect(() => {
    setIsBtnContinueDisabled(isEmpty(childName));
  }, [childName]);

  const handleOnPressContinueButton = () => {
    let params = {
      name: childName,
    };
    if (addChildFlowIsEditing) {
      params = {
        ...params,
        isEditing: true,
      };
    }
    navigation.navigate(NAV_ROUTES.chooseAvatar, params);
  };

  const handleOnChildNameInputChange = val => setChildName(val.trim());

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

  const onPressBackButton = () => {
    navigation.navigate(NAV_ROUTES.home);
  };

  return (
    <>
      <ScreenBackground>
        <Container paddingLeft={20} paddingRight={20}>
          {showToolbar && <Toolbar onPressBackButton={onPressBackButton} />}
          {renderContent()}
        </Container>
      </ScreenBackground>
      {renderFooter()}
    </>
  );
};

export {ChildNameInputScreen};
