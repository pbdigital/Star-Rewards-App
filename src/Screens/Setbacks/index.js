import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {RewardsToolbar, ScreenBackground, HistoryButton} from 'Components';
import {useSelectProvider} from '../../ContextProviders';
import styles from './styles';
import {
  Button,
  ConfirmationModal,
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

const MOCK_SETBACKS = Array.from(new Array(10));


const SetbacksScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {startOpenAnimation} = useSelectProvider();
  const childId = useSelector(childIdSelector);
  const setbacks = useSelector(childSetbacksSelector);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

  useEffect(() => {
    retrieveChildSetbacks();
  }, []);

  const retrieveChildSetbacks = async () => {
    const {payload: resultPayload} = dispatch(
      childActions.getChildSetback({childId}),
    );
    console.log('retrieveChildSetbacks', {resultPayload});
  };

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
        Add A Behavior
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

  const handleIsDeleting = deleting => setShowLoadingIndicator(deleting);

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
              Setbacks are a way to help children learn from their mistakes and improve their behavior
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}>
              {setbacks.map((item, index) => (
                <SetbacksListItem
                  item={item}
                  index={index}
                  isDeleting={handleIsDeleting}
                />
              ))}
              {renderAddButton()}
            </ScrollView>
          </View>
        </View>
        <HelpModal isVisible={showHelpModal} onClose={helpModalClose} />
      </ScreenBackground>
      {showLoadingIndicator && <LoadingIndicator />}
    </>
  );
};

export {SetbacksScreen};
