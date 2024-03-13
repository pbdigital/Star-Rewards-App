import React from 'react';
import {View} from 'react-native';
import {TutorialContainer} from './TutorialContainer';
import {COLORS} from 'Constants';
import {EmptyListState} from '../EmptyListState';
import {useSelector} from 'react-redux';
import {userInforSelector} from 'AppReduxState';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';
import {styles} from './styles';

const QuickTutorial = () => {
  const user = useSelector(userInforSelector);
  const message = `Let's make your first steps\neven smoother, ${user.firstName}!\nStarry is a guiding star\nto light your way.`;

  return (
    <TutorialContainer
      title="Quick Tutorial"
      backgroundColor={COLORS.Green}
      hideLeftNavigationButton>
      <View style={styles.root}>
        <EmptyListState
          message={message}
          starImage={
            <Image source={Images.StarryTutorial1} width={140} height={160} />
          }
          hideCloudLeft
          hideCloudRight
          messageStyle={styles.message}
        />
      </View>
    </TutorialContainer>
  );
};

export {QuickTutorial};
