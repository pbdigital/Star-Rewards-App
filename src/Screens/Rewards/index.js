import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {childActions} from '../../Redux/Child/ChildSlice';
import {
  childIdSelector,
  childRewardsSelector,
} from '../../Redux/Child/ChildSelectors';
import {Images} from '../../Assets/Images';
import {
  Image,
  LoadingIndicator,
  RewardsListItem,
  RewardsToolbar,
  ScreenBackground,
  Text,
} from '../../Components';
import moment from 'moment';

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
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const rewards = useSelector(childRewardsSelector);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getChildRewards = async () => {
      setIsLoading(true);
      await dispatch(
        childActions.getChildRewards({childId, time: moment().format()}),
      );
      setIsLoading(false);
    };

    getChildRewards();
  }, [childId]);

  const listHeader = () => (
    <Text fontSize={16} fontWeight="400" lineHeight={28} textAlign="center">
      Celebrate your child’s progress{'\n'}with real life rewards
    </Text>
  );

  const renderItem = ({item}) => <RewardsListItem item={item} />;

  return (
    <>
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
          data={[...rewards, NEW_ITEM]}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={listHeader}
          numColumns={2}
          columnWrapperStyle={styles.listColumnWrapper}
          renderItem={renderItem}
        />
      </ScreenBackground>
      {isLoading && <LoadingIndicator />}
    </>
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
