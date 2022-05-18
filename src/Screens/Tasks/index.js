import React from 'react';
import {View} from 'react-native';
import {ScreenBackground} from '../../Components/ScreenBackground';
import {Button} from '../../Components/Button';
import {COLORS} from '../../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Toolbar} from '../../Components/Toolbar';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {Image} from '../../Components/Image';
import {Images} from '../../Assets/Images';
import {Bubble} from '../../Components';
import {CloudBackgroundRightOverLeft} from '../../Components/ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundRightOverLeft';
import {
  Container,
  Content,
  Footer,
  CloudBackgroundContainer,
  AvatarContainer,
  ToolbarContainer,
} from './styles';

const TasksScreen = () => {
  const navigation = useNavigation();

  const handleOnPressContinueButton = () => {
    navigation.navigate(NAV_ROUTES.addTasks);
  };

  const renderFooter = () => (
    <SafeAreaView
      edges={['bottom']}
      style={{backgroundColor: COLORS.Background}}>
      <Footer>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Blue}
          shadowColor={COLORS.BlueShadow}
          onPress={handleOnPressContinueButton}
          title="Add Task"
          buttonTitleFontSize={16}
          leftIcon={<Image source={Images.IcAdd} width={24} height={24} />}
        />
      </Footer>
    </SafeAreaView>
  );

  return (
    <>
      <ScreenBackground cloudType={0}>
        <Container>
          <ToolbarContainer>
            <Toolbar title="Tasks" />
          </ToolbarContainer>
          <Content>
            <Bubble marginBottom={34} />
            <AvatarContainer>
              <Image
                source={Images.Monster1}
                height={140}
                width={140}
                marginTop={34}
              />
              <CloudBackgroundContainer>
                <CloudBackgroundRightOverLeft />
              </CloudBackgroundContainer>
            </AvatarContainer>
          </Content>
        </Container>
      </ScreenBackground>
      {renderFooter()}
    </>
  );
};

export {TasksScreen};
