import React, {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Button} from '../../Components/Button';
import {AvatarList} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {Container, Content, Footer} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Toolbar} from '../../Components/Toolbar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {childActions} from '../../Redux/Child/ChildSlice';
import {NAV_ROUTES} from '../../Constants/Navigations';

const ChooseAvatarScreen = () => {
  const route = useRoute();
  const {onSuccess, name} = route.params || {};
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);

  const handleOnAvatarSelected = avatarId => setSelectedAvatarId(avatarId);

  const handleOnPressContinueButton = useCallback(async () => {
    setIsLoading(true);
    const {
      payload: {success, childId},
    } = await dispatch(
      childActions.addChild({
        name,
        avatarId: selectedAvatarId,
      }),
    );
    setIsLoading(false);
    if (success && childId) {
      if (onSuccess) {
        onSuccess();
      } else {
        navigation.navigate(NAV_ROUTES.tasks);
      }
    } else {
      Alert.alert('Unable to create a child. Please try again later.');
    }
  }, [selectedAvatarId, name, onSuccess, setIsLoading, navigation, dispatch]);

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
          disabled={!selectedAvatarId}
          isLoading={isLoading}
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
            <AvatarList onAvatarSelected={handleOnAvatarSelected} />
          </Content>
        </Container>
      </ScreenBackground>
      {renderFooter()}
    </>
  );
};

export {ChooseAvatarScreen};
