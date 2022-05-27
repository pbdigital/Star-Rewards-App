import React from 'react';
import {Container} from './styles';
import {ProfileChildSelector} from '../ProfileChildSelector';
import {StartPointDisplay} from '../StarPointDisplay';
import {SettingsButton} from '../SettingsButton';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';

const RewardsToolbar = () => {
  const navigation = useNavigation();

  const handleOnPressSettingsButton = () => {
    navigation.navigate(NAV_ROUTES.settings);
  }
  return (
    <Container>
      <ProfileChildSelector contentContainerStyle={{flex:1}} />
      <StartPointDisplay marginRight={34} />
      <SettingsButton onPress={handleOnPressSettingsButton} />
    </Container>
  );
};

export {RewardsToolbar};
