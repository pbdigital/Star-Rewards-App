import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TutorialContainer} from './TutorialContainer';
import {COLORS} from 'Constants';
import {EmptyListState} from '../EmptyListState';
import {useSelector} from 'react-redux';
import {userInforSelector} from 'Redux';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';

const QuickTutorial = () => {
  const user = useSelector(userInforSelector);
  return (
    <TutorialContainer title="Quick Tutorial" backgroundColor={COLORS.Green}>
      <View style={styles.root}>
        <EmptyListState
          message={`Let's make your first steps\neven smoother, ${user.firstName}!\nStarry is a guiding star\nto light your way.`}
          starImage={
            <Image
              source={Images.StarryAuthTasksScreen}
              width={140}
              height={160}
            />
          }
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

export {QuickTutorial};
