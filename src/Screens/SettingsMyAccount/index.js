import React, {useCallback, useMemo} from 'react';
import {Linking, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from 'Assets/Images';
import {Button, Image, Toolbar, Text} from 'Components';
import {COLORS} from 'Constants';
import {useNavigation} from '@react-navigation/native';
import {userInforSelector, userActions} from 'Redux';
import {NAV_ROUTES} from 'Constants';
import {doHapticFeedback} from 'Helpers';
import {
  LINK_DELETE_ACCOUNT,
  LINK_HELP,
  LINK_PRIVACY,
} from '../../Constants/Defaults';
import {getVersion} from 'react-native-device-info';
import {noop} from 'lodash';
import {
  Root,
  Container,
  Content,
  AvatarChangeButton,
  Padded,
  InfoContainer,
  InfoItemContainer,
} from './styles';

const SettingsMyAccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(userInforSelector);
  const appVersion = getVersion();

  const handleOnPressLogout = async () => {
    await dispatch(userActions.logout());
    navigation.navigate(NAV_ROUTES.authNavigationStack);
  };

  const InfoItem = useCallback(
    ({label, value, onPress, ...props}) => (
      <InfoItemContainer
        onPress={() => {
          doHapticFeedback();
          if (onPress) {
            onPress();
          }
        }}
        {...props}>
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
          style={styles.flex1}>
          {value}
        </Text>
        <Image source={Images.IcArrowRight} width={5} height={10} />
      </InfoItemContainer>
    ),
    [],
  );

  const handleOnPressUpdateName = useCallback(() => {
    navigation.navigate(NAV_ROUTES.myAccountUpdateName);
  }, [navigation]);

  const handleOnPressChangeEmail = useCallback(() => {
    navigation.navigate(NAV_ROUTES.myAccountChangeEmail);
  }, [navigation]);

  const handleOnPressPassword = useCallback(() => {
    navigation.navigate(NAV_ROUTES.myAccountChangePassword);
  }, [navigation]);

  const linkTo = url => {
    if (!Linking.canOpenURL(url)) {
      return;
    }
    Linking.openURL(url);
  };

  const renderInfo = useMemo(() => {
    return (
      <Padded>
        <InfoContainer>
          <InfoItem
            label="Name"
            value={userInfo?.firstName || ''}
            onPress={handleOnPressUpdateName}
            paddingBottom={20}
            borderBottomWidth={1}
          />
          <InfoItem
            label="Email"
            value={userInfo?.email || ''}
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
            paddingBottom={20}
            borderBottomWidth={1}
          />
          <InfoItem
            label="Help"
            value=""
            onPress={() => linkTo(LINK_HELP)}
            paddingTop={20}
            paddingBottom={20}
            borderBottomWidth={1}
          />
          <InfoItem
            label="Privacy & Terms"
            value=""
            onPress={() => linkTo(LINK_PRIVACY)}
            paddingTop={20}
            paddingBottom={20}
            borderBottomWidth={1}
          />
          <InfoItem
            label="Delete Account"
            value=""
            onPress={() => linkTo(LINK_DELETE_ACCOUNT)}
            paddingTop={20}
            paddingBottom={20}
            borderBottomWidth={1}
          />
          <InfoItem
            label="App Version"
            value={`v${appVersion}`}
            onPress={noop}
            paddingTop={20}
          />
        </InfoContainer>
      </Padded>
    );
  }, [
    userInfo,
    handleOnPressUpdateName,
    handleOnPressChangeEmail,
    handleOnPressPassword,
    appVersion,
  ]);

  return (
    <>
      <Root>
        <Container>
          <Padded>
            <Toolbar title="My Account" />
          </Padded>
          <Content>
            <AvatarChangeButton>
              <Image
                source={{url: userInfo?.avatar}}
                width={60}
                height={60}
                style={styles.avatarImage}
              />
              {/* <Text
                fontSize={18}
                lineHeight={27}
                fontWeight="500"
                textAlign="center"
                marginTop={8}
                color={COLORS.Blue}>
                Choose avatar
              </Text> */}
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

const styles = StyleSheet.create({
  avatarImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: COLORS.White,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.LightBlue,
    borderWidth: 4,
    resizeMode: 'contain',
  },
  flex1: {
    flex: 1,
  },
});

export {SettingsMyAccountScreen};
