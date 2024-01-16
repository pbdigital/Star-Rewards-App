import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, NAV_ROUTES} from 'Constants';
import {Images} from 'Assets/Images';
import {StarRewardsStackNavigator} from './StarRewardsStackNavigator';
import {Image} from 'Components';
import {BonusStarsStackNavitagor} from './BonusStarsStackNavitagor';
import {RewardsStackNavigator} from './RewardsStackNavigator';
import {SettingsStackNavigator} from './SettingsStackNavigator';
import {StarSetbackStackNavigator} from './StarSetbackStackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const safeAreaInset = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName={NAV_ROUTES.starRewardsStackNavigator}
      screenOptions={{
        tabBarActiveTintColor: COLORS.Blue,
        tabBarInActiveTintColor: COLORS.Grey,
        tabBarStyle: {
          paddingBottom: safeAreaInset.bottom - 12,
        },
      }}>
      <Tab.Screen
        name={NAV_ROUTES.starRewardsStackNavigator}
        component={StarRewardsStackNavigator}
        options={getTabBarScreenOptions('Stars', Images.IcMenuStars)}
      />
      <Tab.Screen
        name={NAV_ROUTES.bonusStarsStackNavitagor}
        component={BonusStarsStackNavitagor}
        options={getTabBarScreenOptions('Bonus Stars', Images.IcMenuBonusStars)}
      />
      <Tab.Screen
        name={NAV_ROUTES.starSetbackStackNavigator}
        component={StarSetbackStackNavigator}
        options={getTabBarScreenOptions('Set Backs', Images.IcMenuStarSetBack)}
      />
      <Tab.Screen
        name={NAV_ROUTES.rewardsStackNavigator}
        component={RewardsStackNavigator}
        options={getTabBarScreenOptions('Rewards', Images.IcMenuRewards)}
      />
      {/* <Tab.Screen
        name={NAV_ROUTES.spinWheel}
        component={SpinWheelScreen}
        options={getTabBarScreenOptions('Spin Wheel', Images.IcMenuSpinWheel)}
      /> */}
      <Tab.Screen
        name={NAV_ROUTES.settingsStackNavigator}
        component={SettingsStackNavigator}
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
