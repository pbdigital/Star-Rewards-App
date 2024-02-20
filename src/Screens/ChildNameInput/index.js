import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  userInforSelector,
  childStateAddChildFlowIsEditingSelector,
} from 'Redux';
import {
  ScreenBackground,
  Text,
  Button,
  Toolbar,
  EmptyListState,
} from 'Components';
import {COLORS} from 'Constants';
import {NAV_ROUTES} from 'Constants';
import {isEmpty} from 'lodash';
import {
  Container,
  Content,
  TextInput,
  Footer,
  ToolbarContainer,
} from './styles';
import {StarRewardsStackNavigator} from 'Navigations';
import {Image} from 'react-native';
import {Images} from 'src/Assets/Images';

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
        placeholder="Enter Name"
        placeholderTextColor="rgba(128, 181, 240, 0.30)"
      />
      <EmptyListState
        message="Let's add a touch of magic! What's your little one's name? This is where their journey begins."
        footerNote=""
        starImage={<Image source={Images.Starry} width={152} height={160} />}
        hideCloudLeft
        hideCloudRight
        contentContainerStyle={{marginTop: 63}}
      />
    </Content>
  );

  const onPressBackButton = () => {
    navigation.navigate(NAV_ROUTES.bottomTabNavigator, {
      screen: StarRewardsStackNavigator,
    });
  };

  return (
    <>
      <ScreenBackground cloudType={2}>
        <Container>
          {showToolbar && (
            <ToolbarContainer>
              <Toolbar onPressBackButton={onPressBackButton} />
            </ToolbarContainer>
          )}
          {renderContent()}
        </Container>
      </ScreenBackground>
      {renderFooter()}
    </>
  );
};

export {ChildNameInputScreen};
