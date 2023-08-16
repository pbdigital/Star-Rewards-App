import React from 'react';
import {View} from 'react-native';
import {TutorialContainer} from './TutorialContainer';
import {COLORS} from 'Constants';
import {EmptyListState} from '../EmptyListState';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';
import {styles} from './styles';

const ClaimingRewards = () => {
  const message =
    'When the time is right, their\nhard-earned stars can be traded\nfor delightful rewards. Just tap on\na reward to make it theirs!';

  return (
    <TutorialContainer title="Claiming Rewards" backgroundColor={COLORS.Yellow}>
      <View style={styles.root}>
        <EmptyListState
          message={message}
          starImage={
            <Image source={Images.StarryTutorial4} width={143} height={160} />
          }
          hideCloudLeft
          hideCloudRight
          messageStyle={styles.message}
        />
      </View>
    </TutorialContainer>
  );
};

export {ClaimingRewards};
