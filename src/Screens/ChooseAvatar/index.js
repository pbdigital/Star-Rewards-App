import React, { useState } from 'react';
import {Alert} from 'react-native';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Button} from '../../Components/Button';
import {AvatarList} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {Container, Content, Footer} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Toolbar} from '../../Components/Toolbar';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {childActions} from '../../Redux/Child/ChildSlice';
import {NAV_ROUTES} from '../../Constants/Navigations';

const ChooseAvatarScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedAvatar = useSelector(({child}) => child.avatar);
  const name = useSelector(({child}) => child.childName);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnPressContinueButton = async () => {
    console.log({selectedAvatar, name});
    setIsLoading(true);
    const {
      payload: {success, childId},
    } = await dispatch(
      childActions.addChild({
        name,
        avatarId: selectedAvatar.id,
      }),
    );
    setIsLoading(false);
    if (success && childId) {
      navigation.navigate(NAV_ROUTES.tasks);
    } else {
      Alert.alert('Unable to create a child. Please try again later.');
    }
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
          disabled={!selectedAvatar}
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
            <AvatarList />
          </Content>
        </Container>
      </ScreenBackground>
      {renderFooter()}
    </>
  );
};

export {ChooseAvatarScreen};
