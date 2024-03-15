import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Images} from 'Assets/Images';
import {NAV_ROUTES} from 'Constants';
import {Image} from '../Image';
import {doHapticFeedback} from 'Helpers';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {childActions} from 'AppReduxState';

const HistoryButton = ({tab}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleOnPressHistoryButton = useCallback(() => {
    doHapticFeedback();
    dispatch(childActions.resetHistoryData());
    navigation.navigate(NAV_ROUTES.history, {
      // tab,
    });
  }, [dispatch, tab, navigation]);

  return (
    <TouchableOpacity onPress={handleOnPressHistoryButton}>
      <Image source={Images.IcClock} width={28} height={26} />
    </TouchableOpacity>
  );
};

export {HistoryButton};
