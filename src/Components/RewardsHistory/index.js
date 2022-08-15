import React, {useMemo, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {childActions, childIdSelector, rewardsHistorySelector} from 'Redux';
import {RewardsHistoryListItem} from '../ListItems';

const RewardsHistory = () => {
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const rewardsHistory = useSelector(rewardsHistorySelector);

  useEffect(() => {
    dispatch(childActions.getRewardsHistory({childId}));
  }, [childId]);

  const renderCompleted = useMemo(() => {
    const extractedRewardHistories = Object.values(rewardsHistory).reduce(
      (prev, cur) => {
        return [...prev, ...cur];
      },
      [],
    );
    return extractedRewardHistories.map((item, index) => {
      return (
        <RewardsHistoryListItem
          {...item}
          hideCloseButton={true}
          marginTop={0}
          marginBottom={20}
        />
      );
    });
  }, [rewardsHistory]);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{marginTop: 30}}>{renderCompleted}</View>
    </ScrollView>
  );
};

export {RewardsHistory};
