import React, {useMemo, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {childActions, childIdSelector, rewardsHistorySelector} from 'Redux';
import {RewardsHistoryListItem} from '../ListItems';

const RewardsHistory = () => {
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const rewardsHistory = useSelector(rewardsHistorySelector);
  const [refTasksSwipeRow, setRefTasksSwipeRow] = useState([]);

  useEffect(() => {
    dispatch(childActions.getRewardsHistory({childId}));
  }, [childId]);

  const closeRowExcept = (refSwipeTaskRow, activeIndex) => {
    refSwipeTaskRow?.forEach((itemSwipeRow, index) => {
      if (index === activeIndex) {
        return;
      }

      itemSwipeRow?.closeRow();
    });
  };

  const renderCompleted = useMemo(() => {
    setRefTasksSwipeRow([]);
    const extractedRewardHistories = Object.values(rewardsHistory).reduce(
      (prev, cur) => {
        return [...prev, ...cur];
      },
      [],
    );
    return extractedRewardHistories.map((item, index) => {
      return (
        <RewardsHistoryListItem
          ref={ref => refTasksSwipeRow?.push(ref)}
          {...item}
          hideCloseButton={true}
          marginTop={0}
          marginBottom={20}
          handleOnRowOpen={() => {
            closeRowExcept(refTasksSwipeRow, index);
          }}
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
