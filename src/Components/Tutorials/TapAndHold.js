import React from 'react';
import {View} from 'react-native';
import {TutorialContainer} from './TutorialContainer';
import {COLORS} from 'Constants';
import {EmptyListState} from '../EmptyListState';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';
import {styles} from './styles';

const TapAndHold = () => {
  const message =
    'Simply tap and hold on a\ntask to mark it as complete.\nWatch the stars twinkle as your\nchild conquers each mission!';

  return (
    <TutorialContainer title="Tap & Hold" backgroundColor={COLORS.Purple}>
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
