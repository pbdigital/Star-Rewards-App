import React from 'react';
import {View} from 'react-native';
import {TutorialContainer} from './TutorialContainer';
import {COLORS} from 'Constants';
import {EmptyListState} from '../EmptyListState';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';
import {Text} from '../Text';
import {styles} from './styles';

const EarningRewards = () => {
  const message =
    "As your child completes tasks,\nthey'll earn stars. Collect enough\nstars, and a universe of rewards\nwill unfold before them.";

  const demoContent = (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[styles.demoContainer, {flexDirection: 'row'}]}>
      <Image source={Images.Star} width={85} height={80} />
      <Text
        style={styles.label}
        fontSize={60}
        fontWeight="600"
        lineHeight={72}
        textAlign="center"
        marginLeft={10}
        color={COLORS.White}>
        + 1
      </Text>
    </View>
  );

  return (
    <TutorialContainer
      title="Earning Rewards"
      backgroundColor={COLORS.Blue}
      demoContent={demoContent}>
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
