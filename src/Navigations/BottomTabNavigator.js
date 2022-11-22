import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, NAV_ROUTES} from 'Constants';
import {Images} from 'Assets/Images';
import {RewardsStackNavigator} from './RewardsStackNavigator';
import {Image} from 'Components';
import {RewardsScreen, SettingsScreen, SpinWheelScreen} from 'Screens';

const Tab = createBottomTabNavigator();

const TabBarIcon = (ic, tabBarStateProp) => {
  const tintColor = tabBarStateProp?.focused ? COLORS.Yellow : COLORS.Grey;
  return <Image height={24} width={24} source={ic} style={{tintColor}} />;
};

const getTabBarScreenOptions = (label, icon) => ({
  tabBarLabel: label,
  tabBarVisible: true,
  headerShown: false,
  tabBarIcon: tabBarStateProps => TabBarIcon(icon, tabBarStateProps),
  tabBarLabelStyle: styles.tabBarLabel,
});

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={NAV_ROUTES.rewardsStackNavigator}
      screenOptions={{
        tabBarActiveTintColor: COLORS.Blue,
        tabBarInActiveTintColor: COLORS.Grey,
      }}>
      <Tab.Screen
        name={NAV_ROUTES.rewardsStackNavigator}
        component={RewardsStackNavigator}
        options={getTabBarScreenOptions('Stars', Images.IcMenuStars)}
      />
      <Tab.Screen
        name={'Bonus Stars'}
        component={RewardsStackNavigator}
        options={getTabBarScreenOptions('Bonus Stars', Images.IcMenuBonusStars)}
      />
      <Tab.Screen
        name={NAV_ROUTES.rewards}
        component={RewardsScreen}
        options={getTabBarScreenOptions('Rewards', Images.IcMenuRewards)}
      />
      <Tab.Screen
        name={NAV_ROUTES.spinWheel}
        component={SpinWheelScreen}
        options={getTabBarScreenOptions('Spin Wheel', Images.IcMenuSpinWheel)}
      />
      <Tab.Screen
        name={NAV_ROUTES.settings}
        component={SettingsScreen}
        options={getTabBarScreenOptions('Settings', Images.IcMenuSettings)}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 9,
    lineHeight: 14,
    fontWeight: '500',
  },
});

export {BottomTabNavigator};
