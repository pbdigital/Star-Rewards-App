import React from 'react';
import {View} from 'react-native';
import {TutorialContainer} from './TutorialContainer';
import {COLORS} from 'Constants';
import {EmptyListState} from '../EmptyListState';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';
import {styles} from './styles';

const EarningRewards = () => {
  const message =
    "As your child completes tasks,\nthey'll earn stars. Collect enough\nstars, and a universe of rewards\nwill unfold before them.";

  return (
    <TutorialContainer title="Earning Rewards" backgroundColor={COLORS.Blue}>
      <View style={styles.root}>
        <EmptyListState
          message={message}
          starImage={
            <Image source={Images.StarryTutorial3} width={180} height={160} />
          }
          hideCloudLeft
          hideCloudRight
          messageStyle={styles.message}
        />
      </View>
    </TutorialContainer>
  );
};

export {EarningRewards};
