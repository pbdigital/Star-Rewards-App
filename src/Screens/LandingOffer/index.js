import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {OfferMembershipModal} from 'Components';
// import {Navigation} from '../../Constants';

const LandingOfferScreen = () => {
  const route = useRoute();
  const {content} = route.params ?? {};
  const navigation = useNavigation();
  const navigatetoBottomStackNavigator = () => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: Navigation.HomeScreen}],
    // });
  };

  return (
    <OfferMembershipModal
      isModalVisible={true}
      onClose={navigatetoBottomStackNavigator}
      onSubscribed={navigatetoBottomStackNavigator}
      onDismissPushNotificationPermission={navigatetoBottomStackNavigator}
      content={content}
    />
  );
};

export {LandingOfferScreen};
