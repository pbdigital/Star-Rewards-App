import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {RewardsToolbar, ScreenBackground, HistoryButton} from 'Components';
import {useSelectProvider} from '../../ContextProviders';
import styles from './styles';
import {
  HelpModal,
  Image,
  LoadingIndicator,
  SetbacksListItem,
  Text,
} from '../../Components';
import {COLORS, NAV_ROUTES} from '../../Constants';
import {Images} from '../../Assets/Images';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  childActions,
  childIdSelector,
  childSetbacksSelector,
} from '../../Redux';

const SetbacksScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {startOpenAnimation} = useSelectProvider();
  const childId = useSelector(childIdSelector);
  const setbacks = useSelector(childSetbacksSelector);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [refSetbackSwipeRow, setRefSetbackSwipeRow] = useState([]);

  useEffect(() => {
    retrieveChildSetbacks();
  }, [childId]);

  const fetchAllChildren = useCallback(async () => {
    const {payload} = await dispatch(childActions.getAllChildren());
    if (!payload?.success) {
      Alert.alert('Unable to retrive your child list. Please try again later.');
    }
  }, [dispatch]);

  const retrieveChildSetbacks = useCallback(async () => {
    setShowLoadingIndicator(true);
    const {payload: resultPayload} = await dispatch(
      childActions.getChildSetback({childId}),
    );
    setShowLoadingIndicator(false);
    console.log('retrieveChildSetbacks', {resultPayload});
  }, [childId]);

  const onPressAddBehaviorButton = () => {
    navigation.navigate(NAV_ROUTES.addSetbackBehaviorScreen);
  };

  const renderAddButton = () => (
    <TouchableOpacity
      style={styles.addButton}
      onPress={onPressAddBehaviorButton}>
      <Image
        source={Images.IcAdd}
        width={24}
        height={24}
        style={styles.addImage}
      />
      <Text fontSize={18} fontWeight="600" color={COLORS.Blue} marginLeft={16}>
        Add A Setback
      </Text>
    </TouchableOpacity>
  );

  const helpModalOpen = () => setShowHelpModal(true);
  const helpModalClose = () => setShowHelpModal(false);

  const renderHelpButton = () => {
    return (
      <TouchableOpacity onPress={helpModalOpen}>
        <Image source={Images.IcHelp} style={styles.icHelp} />
      </TouchableOpacity>
    );
  };

  const handleSetbackListItemLoading = loading =>
    setShowLoadingIndicator(loading);

  const closeRowExcept = (rows, activeIndex) => {
    rows?.forEach((itemSwipeRow, index) => {
      if (index === activeIndex) {
        return;
      }
      itemSwipeRow?.closeRow();
    });
  };

  const renderList = useMemo(() => {
    setRefSetbackSwipeRow([]);
    return setbacks.map((item, index) => (
      <SetbacksListItem
        item={item}
        index={index}
        isLoading={handleSetbackListItemLoading}
        ref={ref => refSetbackSwipeRow?.push(ref)}
        closeRow={() => closeRowExcept(refSetbackSwipeRow, null)}
        handleOnRowOpen={() => closeRowExcept(refSetbackSwipeRow, index)}
        onPressUpdateButton={() => closeRowExcept(refSetbackSwipeRow, null)}
        key={`setback-list-item-${index}`}
      />
    ));
  }, [setbacks]);

  const handleOnrefresh = useCallback(async () => {
    setRefreshing(true);
    await retrieveChildSetbacks();
    await fetchAllChildren();
    setTimeout(() => {
      setRefreshing(false);
    }, 300);
  }, [retrieveChildSetbacks]);

  return (
    <>
      <ScreenBackground cloudType={0}>
        <RewardsToolbar
          rightControlButton={<HistoryButton />}
          onPressSelectChild={startOpenAnimation}
        />
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View style={styles.headerTitleContainer}>
              <Text
                fontSize={20}
                lineHeight={28}
                fontWeight="600"
                textAlign="left"
                marginBottom={11}
                color={COLORS.Black}>
                Setbacks
              </Text>
              {renderHelpButton()}
            </View>
            <Text
              fontSize={16}
              fontWeight="400"
              lineHeight={28}
              textAlign="left"
              color={COLORS.Black}>
              Star Setbacks gently guide your child towards positive behavior by
              reflecting on moments that need improvement.
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleOnrefresh}
              />
            }>
            {renderList}
            {renderAddButton()}
          </ScrollView>
        </View>
        <HelpModal isVisible={showHelpModal} onClose={helpModalClose} />
      </ScreenBackground>
      {showLoadingIndicator && <LoadingIndicator />}
    </>
  );
};

export {SetbacksScreen};
