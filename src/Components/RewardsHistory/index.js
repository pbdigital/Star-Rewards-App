/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useEffect, useState, useCallback} from 'react';
import {RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {childActions, childIdSelector, rewardsHistorySelector} from 'AppReduxState';
import {RewardsHistoryListItem} from '../ListItems';
import {Content, Root} from './styles';

const RewardsHistory = () => {
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const rewardsHistory = useSelector(rewardsHistorySelector);
  const [refTasksSwipeRow, setRefTasksSwipeRow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRewardsHistory();
  }, [getRewardsHistory]);

  const getRewardsHistory = useCallback(async () => {
    setIsLoading(true);
    await dispatch(childActions.getRewardsHistory({childId}));
    setIsLoading(false);
  }, [childId, dispatch]);

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
          key={`${index}-${item?.id}-reward-history`}
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
    <Root
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={getRewardsHistory} />
      }>
      <Content>{renderCompleted}</Content>
    </Root>
  );
};

export {RewardsHistory};
