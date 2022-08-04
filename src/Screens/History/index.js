import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {childActions} from 'Redux';
import {
  childIdSelector,
  childNameSelector,
  childRewardsSelector,
  childStateIsLoadingSelector,
} from 'Redux';
import {LoadingIndicator, RewardsToolbar, ScreenBackground} from 'Components';
import {useNavigation} from '@react-navigation/native';

const HistoryScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <ScreenBackground cloudType={0}>
        <RewardsToolbar
          hideAvatar
          title="History"
          showBorderBottom
          hideStarPointDisplay
        />
      </ScreenBackground>
      {isLoading && <LoadingIndicator />}
    </>
  );
};

export {HistoryScreen};
