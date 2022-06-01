import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Images} from '../../Assets/Images';
import {
  Image,
  RewardsListItem,
  RewardsToolbar,
  ScreenBackground,
  Text,
} from '../../Components';

const MOCK_REWARDS = [
  {
    name: 'Gift',
    starsNeededToUnlock: 10,
    emoji: '🍔',
  },
  {
    name: 'Candy',
    starsNeededToUnlock: 3,
    emoji: '🦄',
  },
  {
    name: 'Light',
    starsNeededToUnlock: 2,
    emoji: '💡',
  },
  {
    name: 'Watch',
    starsNeededToUnlock: 10,
    emoji: '🕘',
  },
];

const NEW_ITEM = {
  isAddItem: true,
};

const RewardsScreen = () => {
  const listHeader = () => (
    <Text fontSize={16} fontWeight="400" lineHeight={28} textAlign="center">
      Celebrate your child’s progress{'\n'}with real life rewards
    </Text>
  );

  const renderItem = ({item}) => <RewardsListItem item={item} />;

  return (
    <ScreenBackground cloudType={0}>
      <RewardsToolbar
        hideAvatar
        title="Rewards"
        showBorderBottom
        rightControlButton={
          <Image source={Images.IcClock} width={28} height={25} />
        }
      />
      <FlatList
        data={[...MOCK_REWARDS, NEW_ITEM]}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={listHeader}
        numColumns={2}
        columnWrapperStyle={styles.listColumnWrapper}
        renderItem={renderItem}
      />
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 30,
  },
  listColumnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 26,
  },
});

export {RewardsScreen};
