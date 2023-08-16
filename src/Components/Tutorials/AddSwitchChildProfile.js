import React from 'react';
import {View} from 'react-native';
import {TutorialContainer} from './TutorialContainer';
import {COLORS} from 'Constants';
import {EmptyListState} from '../EmptyListState';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';
import {styles} from './styles';

const AddSwitchChildProfile = () => {
  const message =
    'To add more children or switch\nprofiles, just head to the profile\nselector located at the top left of\nthe screen.';

  return (
    <TutorialContainer title="Claiming Rewards" backgroundColor={COLORS.Red}>
      <View style={styles.root}>
        <EmptyListState
          message={message}
          starImage={
            <Image source={Images.StarryTutorial5} width={152} height={160} />
          }
          hideCloudLeft
          hideCloudRight
          messageStyle={styles.message}
        />
      </View>
    </TutorialContainer>
  );
};

export {AddSwitchChildProfile};
