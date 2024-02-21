/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'Components';
import {COLORS} from 'Constants';
import {TabBar} from 'react-native-tab-view';

const StarRewardTabBar = props => {
  useEffect(() => {
    console.log({props});
  }, [props]);

  return (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      tabStyle={styles.tab}
      activeColor={COLORS.Blue}
      inactiveColor={COLORS.Black}
      renderLabel={({route, focused, color}) => (
        <View
          style={[
            styles.labelContainer,
            {borderBottomColor: focused ? COLORS.Blue : 'transparent'},
          ]}>
          <Text color={color} fontSize={14} fontWeight="500" lineHeight={21}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LightBlue,
    paddingBottom: 0,
    marginBottom: 0,
    elevation: 0,
  },
  indicator: {
    backgroundColor: 'transparent',
  },
  tab: {
    minWidth: 135,
    paddingBottom: 0,
  },
  labelContainer: {
    borderBottomWidth: 3,
    paddingBottom: 11,
    marginTop: 3,
  },
});

export {StarRewardTabBar};
