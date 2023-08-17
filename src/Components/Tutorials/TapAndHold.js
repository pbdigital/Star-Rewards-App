import React from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import {TutorialContainer} from './TutorialContainer';
import {COLORS} from 'Constants';
import {EmptyListState} from '../EmptyListState';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';
import {styles} from './styles';
import {Text} from '../Text';

const TapAndHold = ({onDemoFinished}) => {
  const message =
    'Simply tap and hold on a\ntask to mark it as complete.\nWatch the stars twinkle as your\nchild conquers each mission!';

  const demoContent = (
    <View style={styles.demoContainer}>
      <TouchableOpacity onPress={onDemoFinished}>
        <ImageBackground
          source={Images.Star}
          resizeMode="cover"
          style={styles.tabHoldStar}>
          <View>
            <Text
              style={styles.label}
              fontSize={11}
              fontWeight="500"
              lineHeight={16}
              textAlign="center"
              marginTop={10}
              numberOfLines={2}
              color={COLORS.Gold}>
              Brush teeth
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );

  return (
    <TutorialContainer
      title="Tap & Hold"
      backgroundColor={COLORS.Purple}
      demoContent={demoContent}
      hideLeftNavigationButton
      hideRightNavigationButton>
      <View style={styles.root}>
        <EmptyListState
          message={message}
          starImage={
            <Image source={Images.StarryTutorial2} width={152} height={160} />
          }
          hideCloudLeft
          hideCloudRight
          messageStyle={styles.message}
        />
      </View>
    </TutorialContainer>
  );
};

export {TapAndHold};
