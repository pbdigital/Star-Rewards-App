import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TutorialContainer} from './TutorialContainer';
import {COLORS} from 'Constants';
import {EmptyListState} from '../EmptyListState';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';

const TapAndHold = () => {
  const message =
    'Simply tap and hold on a\ntask to mark it as complete.\nWatch the stars twinkle as your\nchild conquers each mission!';
  return (
    <TutorialContainer title="Tap & Hold" backgroundColor={COLORS.Purple}>
      <View style={styles.root}>
        <EmptyListState
          message={message}
          starImage={<Image source={Images.Starry} width={152} height={160} />}
          hideCloudLeft
          hideCloudRight
        />
      </View>
    </TutorialContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export {TapAndHold};
