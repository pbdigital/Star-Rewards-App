import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Images} from 'Assets/Images';
import {NAV_ROUTES} from 'Constants';
import {Image} from '../Image';
import {doHapticFeedback} from 'Helpers';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {childActions, isReadOnlySelector} from 'Redux';

const HistoryButton = ({isRewards}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isReadOnly = useSelector(isReadOnlySelector);

  const handleOnPressHistoryButton = useCallback(() => {
    doHapticFeedback();
    dispatch(childActions.resetHistoryData());
    navigation.navigate(NAV_ROUTES.history, {
      isRewards,
    });
  }, [dispatch, isRewards, navigation]);

  return (
    <TouchableOpacity onPress={handleOnPressHistoryButton}>
      <Image source={Images.IcClock} width={28} height={26} />
    </TouchableOpacity>
  );
};

export {HistoryButton};
