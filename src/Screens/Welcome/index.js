import React, {useEffect, useMemo, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Button, CloudImage, Image, Text} from 'Components';
import {Images} from 'src/Assets/Images';
import {COLORS, NAV_ROUTES} from 'Constants';
import LottieView from 'lottie-react-native';
import {LottieAnimations} from 'src/Assets/LottieAnimations';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {
  AnimationContainer,
  ButtonContainer,
  FooterContainer,
  Monster1,
  Monster2,
  Monster3,
  Root,
  StarLogoContainer,
  WelcomeNoteContainer,
  styles,
} from './styles';
import {doHapticFeedback} from 'Helpers';
import {CommonActions, useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => [164], []);

  useEffect(() => {
    setTimeout(() => {
      bottomSheetModalRef?.current?.present();
    }, 2000);
  }, [bottomSheetModalRef]);

  const renderFooter = () => (
    <FooterContainer>
      <Text
        fontSize={16}
        fontWeight="400"
        lineHeight={28}
        textAlign="left"
        color={COLORS.Text.grey}>
        Already have an account?
      </Text>
      <TouchableOpacity onPress={handleOnPressSignup}>
        <Text
          fontSize={16}
          fontWeight="600"
          lineHeight={28}
          textAlign="left"
          fontFamily="Poppins-SemiBold"
          color={COLORS.GreenShadow}>
          {' '}
          Sign-in
        </Text>
      </TouchableOpacity>
    </FooterContainer>
  );

  const closeBottomSheet = () => {
    setTimeout(() => {
      bottomSheetModalRef?.current?.dismiss();
    }, 200);
  };

  const handleOnPressGetStarted = () => {
    doHapticFeedback();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: NAV_ROUTES.authNavigationStack,
            params: {
              screen: NAV_ROUTES.signup,
            },
          },
        ],
      }),
    );
    closeBottomSheet();
  };

  const handleOnPressSignup = () => {
    doHapticFeedback();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: NAV_ROUTES.authNavigationStack,
            params: {
              screen: NAV_ROUTES.login,
            },
          },
        ],
      }),
    );
    closeBottomSheet();
  };

  return (
    <Root>
      <SafeAreaView edges={['top']} />
      <StarLogoContainer>
        <Image source={Images.Logo} width={45} height={45} />
        <Text
          fontSize={17}
          fontWeight="600"
          fontFamily="Poppins-SemiBold"
          marginLeft={6}
          lineHeight={27}
          color={COLORS.Text.black}>
          Star Rewards
        </Text>
      </StarLogoContainer>
      <WelcomeNoteContainer>
        <Text
          fontSize={36}
          fontWeight="600"
          lineHeight={46}
          marginBottom={8}
          marginLeft={37}
          fontFamily="Poppins-SemiBold"
          color={COLORS.Text.black}>
          Family Fun{'\n'}Starts Here!
        </Text>
        <Text
          fontSize={18}
          fontWeight="400"
          lineHeight={27}
          marginLeft={37}
          marginBottom={8}
          color={COLORS.Text.grey}>
          Let's earn stars, unlock{'\n'}treasures, create memories!
        </Text>
        <CloudImage style={styles.bottomLeftCloud} width={79} height={52} />
        <CloudImage style={styles.upperRightCloud} width={94} height={62} />
      </WelcomeNoteContainer>
      <AnimationContainer>
        <View style={styles.animationBackdrop}>
          <Monster1>
            <LottieView
              style={styles.monster1}
              source={LottieAnimations.Monster1SmallV1}
              autoPlay
              loop
            />
          </Monster1>
          <Monster2>
            <LottieView
              style={styles.monster2}
              source={LottieAnimations.Monster2SmallV1}
              autoPlay
              loop
            />
          </Monster2>
          <Monster3>
            <LottieView
              style={styles.monster3}
              source={LottieAnimations.Monster3SmallV1}
              autoPlay
              loop
            />
          </Monster3>
        </View>
      </AnimationContainer>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        enableContentPanningGesture={false}>
        <ButtonContainer>
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Green}
            shadowColor={COLORS.GreenShadow}
            onPress={handleOnPressGetStarted}
            title="Get Started"
            buttonTitleFontSize={16}
            buttonTitleLineHeight={24}
          />
        </ButtonContainer>
        {renderFooter()}
      </BottomSheetModal>
      <SafeAreaView
        edges={['bottom']}
        style={{backgroundColor: COLORS.LightBlue}}
      />
    </Root>
  );
};

export {WelcomeScreen};
