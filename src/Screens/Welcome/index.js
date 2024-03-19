import React from 'react';
import {Dimensions, View} from 'react-native';
import {Image, ScreenBackground, Text} from 'Components';
import { Images } from 'src/Assets/Images';
import { COLORS } from 'Constants';
import LottieView from 'lottie-react-native';
import { LottieAnimations } from 'src/Assets/LottieAnimations';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.Background.screen}}>
      <SafeAreaView edges={['top']} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 37,
          marginTop: 43,
        }}
      >
        <Image source={Images.Logo} width={45} height={45} />
        <Text
          fontSize={17}
          fontWeight="600"
          marginLeft={6}
          lineHeight={27}
          color={COLORS.Text.black}>
          Star Rewards
        </Text>
      </View>
      <View style={{marginTop: 51, marginLeft: 37}}>
        <Text
          fontSize={36}
          fontWeight="600"
          lineHeight={46}
          marginBottom={8}
          color={COLORS.Text.black}>
          Family Fun{'\n'}Starts Here!
        </Text>
        <Text
          fontSize={18}
          fontWeight="400"
          lineHeight={27}
          color={COLORS.Text.grey}>
          Let's earn stars, unlock{'\n'}treasures, create memories!
        </Text>
      </View>
      <View style={{flex: 1}}>
        <View style={{
            backgroundColor: COLORS.LightBlue,
            position: 'absolute',
            flex: 1,
            // height: 270,
            height: Dimensions.get('window').height * 0.31,
            width: '100%',
            bottom: 0,
          }} />
        <View
          style={{
            width: '100%',
            height: 300,
            // backgroundColor: 'white',
            position: 'relative',
          }}>
          <View
            style={{
              width: 300,
              height: 300,
              // backgroundColor: 'green',
              position: 'absolute',
              bottom: 0,
              left: -60,
            }}>
            <LottieView
              style={{
                // backgroundColor: 'red',
                width: 300,
                height: 300,
              }}
              source={LottieAnimations.Monster1SmallV1}
              autoPlay
              loop
            />
          </View>
          <View
            style={{
              width: 260,
              height: 260,
              // backgroundColor: 'green',
              position: 'absolute',
              bottom: 6,
              right: -10,
            }}>
            <LottieView
              style={{
                // backgroundColor: 'red',
                width: 260,
                height: 260
              }}
              source={LottieAnimations.Monster2SmallV1}
              autoPlay
              loop
            />
          </View>
          <View
            style={{
              width: 200,
              height: 200,
              // backgroundColor: 'green',
              position: 'absolute',
              bottom: -16,
              left: (Dimensions.get('window').width / 2) - 110,
            }}>
            <LottieView
              style={{
                // backgroundColor: 'red',
                width: 200,
                height: 200
              }}
              source={LottieAnimations.Monster3SmallV1}
              autoPlay
              loop
            />
          </View>
        </View>
      </View>
      <SafeAreaView
        edges={['bottom']}
        style={{backgroundColor: COLORS.LightBlue}}
      />
    </View>
  );
};

export {WelcomeScreen};
