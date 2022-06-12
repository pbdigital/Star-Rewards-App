import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from '../../Assets/Images';
import {Button, Image, Toolbar, Text} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {userInforSelector} from '../../Redux/User/UserSelectors';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {
  Root,
  Container,
  Content,
  AvatarContainer,
  AvatarChangeButton,
  Padded,
  InfoContainer,
  InfoItemContainer,
} from './styles';

const SettingsMyAccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(userInforSelector);

  const handleOnPressLogout = () => {
    return;
  }

  const handleOnAvatarPress = () => {
    return;
    navigation.navigate(NAV_ROUTES.chooseAvatar, {
      isEditing: true,
      name: childName,
      childAvatarId: avatarId,
      onSuccess: () => {
        if (navigation.canGoBack) {
          navigation.goBack();
        }
      },
    });
  };

  const InfoItem = useCallback(
    ({label, value, onPress, ...props}) => (
      <InfoItemContainer onPress={onPress} {...props}>
        <Text
          fontSize={14}
          lineHeight={21}
          fontWeight="500"
          textAlign="center"
          color={COLORS.Text.black}>
          {label}
        </Text>
        <Text
          fontSize={14}
          lineHeight={21}
          fontWeight="400"
          textAlign="right"
          color={COLORS.Text.grey}
          marginRight={20}
          style={{flex: 1}}>
          {value}
        </Text>
        <Image source={Images.IcArrowRight} width={5} height={10} />
      </InfoItemContainer>
    ),
    [],
  );

  const handleOnPressUpdateName = () => {
    navigation.navigate(NAV_ROUTES.myAccountUpdateName);
  };

  const handleOnPressChangeEmail = () => {
    navigation.navigate(NAV_ROUTES.myAccountChangeEmail);
  };

  const handleOnPressPassword = () => {
    navigation.navigate(NAV_ROUTES.myAccountChangePassword);
  };

  const renderInfo = useMemo(() => {
    return (
      <Padded>
        <InfoContainer>
          <InfoItem
            label="Name"
            value="Paul"
            onPress={handleOnPressUpdateName}
            paddingBottom={20}
            borderBottomWidth={1}
          />
          <InfoItem
            label="Email"
            value="paul@pbdigital.com.au"
            onPress={handleOnPressChangeEmail}
            paddingTop={20}
            paddingBottom={20}
            borderBottomWidth={1}
          />
          <InfoItem
            label="Change Password"
            value=""
            onPress={handleOnPressPassword}
            paddingTop={20}
          />
        </InfoContainer>
      </Padded>
    );
  }, [userInfo, InfoItem]);

  return (
    <>
      <Root>
        <Container>
          <Padded>
            <Toolbar title="My Account" />
          </Padded>
          <Content>
            <AvatarChangeButton onPress={handleOnAvatarPress}>
              <AvatarContainer>
                <Image
                  source={{url: userInfo?.avatar}}
                  width={60}
                  height={60}
                />
              </AvatarContainer>
              <Text
                fontSize={18}
                lineHeight={27}
                fontWeight="500"
                textAlign="center"
                marginTop={8}
                color={COLORS.Blue}>
                Choose avatar
              </Text>
            </AvatarChangeButton>
            {renderInfo}
          </Content>
          <Padded>
            <Button
              borderRadius={16}
              titleColor={COLORS.White}
              buttonColor={COLORS.Green}
              shadowColor={COLORS.GreenShadow}
              onPress={handleOnPressLogout}
              title="Log out"
              buttonTitleFontSize={16}
            />
          </Padded>
        </Container>
      </Root>
    </>
  );
};

export {SettingsMyAccountScreen};