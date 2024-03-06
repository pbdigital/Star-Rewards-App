/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
  createContext,
  useMemo,
} from 'react';
import {
  Easing,
  Animated,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  PanResponder,
  View,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {
  childActions,
  childListSelector,
  userActions,
  userInforSelector,
  selectedChildSelector,
} from 'Redux';
import {Images} from 'Assets/Images';
import {batch, useDispatch, useSelector} from 'react-redux';
import {COLORS} from 'Constants';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  NAV_ROUTES,
  CHILD_SELECTOR_ANIMATION_DURATION_OPEN,
  CHILD_SELECTOR_ANIMATION_DURATION_CLOSE,
} from 'Constants';
import {doHapticFeedback} from 'Helpers';
import moment from 'moment';
import {ImageChildAvatar, Image, Text} from 'Components';
import {isReadOnlySelector} from 'Redux';
import {
  Container,
  SettingsButton,
  SafeAreaView,
  ItemContainer,
  AvatarContainer,
  Profile,
  AddChildButton,
} from './styles';

const DROPDOWN_MAX_HEIGHT_PARENT_ACCESS = 572;
const DROPDOWN_MAX_HEIGHT_CHILD_ACCESS = 280;

const SelectProfileContext = createContext();

const SelectProfileProvider = ({children, onCloseAnimation}) => {
  const dispatch = useDispatch();
  const user = useSelector(userInforSelector);
  const childList = useSelector(childListSelector);
  const selectedChild = useSelector(selectedChildSelector);
  const isReadOnly = useSelector(isReadOnlySelector);
  const navigation = useNavigation();
  const selectorHeight = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);
  const DROPDOWN_MAX_HEIGHT = useMemo(() => {
    return isReadOnly
      ? DROPDOWN_MAX_HEIGHT_CHILD_ACCESS
      : DROPDOWN_MAX_HEIGHT_PARENT_ACCESS;
  }, [isReadOnly]);

  useEffect(() => {
    console.log('SELECTED CHILD 1111', {selectedChild});
    console.log('CHILD LIST CHILD 1111', {childList});
  }, [selectedChild, childList]);

  const [isGestureGoingUp, setIsGestureGoingUp] = useState(false);
  const [panResponders, setPanResponders] = useState({});

  useEffect(() => {
    setPanResponders(
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          const isGoingUp = gestureState.vy < 0;
          if (isGoingUp) {
            return true;
          }
        },
        onPanResponderMove: (evt, gestureState) => {
          const isGoingUp = gestureState.vy < 0;
          setIsGestureGoingUp(gestureState.vy < 0);
          const opacityLevel = selectorHeight._value / DROPDOWN_MAX_HEIGHT;
          opacity.setValue(opacityLevel);
          if (isGoingUp && selectorHeight._value > 0) {
            const newDropdownHeight = selectorHeight._value - 10;
            selectorHeight.setValue(
              newDropdownHeight < 0 ? 0 : newDropdownHeight,
            );
          } else if (!isGoingUp) {
            const newDropdownHeight = selectorHeight._value + 10;
            selectorHeight.setValue(
              newDropdownHeight >= DROPDOWN_MAX_HEIGHT
                ? DROPDOWN_MAX_HEIGHT
                : newDropdownHeight,
            );
          }
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (isGestureGoingUp) {
            startCloseAnimation();
          } else {
            startOpenAnimation();
          }
        },
      }),
    );
  }, [
    startCloseAnimation,
    startOpenAnimation,
    isGestureGoingUp,
    selectorHeight,
    opacity,
    DROPDOWN_MAX_HEIGHT,
  ]);

  const startOpenAnimation = useCallback(() => {
    setIsVisible(true);
    Animated.parallel([
      Animated.timing(selectorHeight, {
        toValue: DROPDOWN_MAX_HEIGHT,
        duration: CHILD_SELECTOR_ANIMATION_DURATION_OPEN,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: CHILD_SELECTOR_ANIMATION_DURATION_OPEN,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  }, [opacity, selectorHeight, DROPDOWN_MAX_HEIGHT]);

  const startCloseAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(selectorHeight, {
        toValue: 0,
        duration: CHILD_SELECTOR_ANIMATION_DURATION_CLOSE,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: CHILD_SELECTOR_ANIMATION_DURATION_CLOSE,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();

    if (onCloseAnimation) {
      onCloseAnimation();
    }
    setIsVisible(false);
  }, [opacity, selectorHeight, onCloseAnimation]);

  const footer = () => {
    const handleOnPressAddChild = async () => {
      doHapticFeedback();
      startCloseAnimation();
      await dispatch(childActions.setAddChildFlowIsEditig(false));
      navigation.reset({
        index: 0,
        routes: [
          {
            name: NAV_ROUTES.newChildSetupStackNavigator,
            params: {
              screen: NAV_ROUTES.childNameInput,
              params: {showToolbar: true},
            },
          },
        ],
      });
    };

    if (isReadOnly) {
      return <ItemContainer paddingVertical={16} disabled={true} borderNone />;
    }

    return (
      <ItemContainer justifyContent="center" borderNone>
        <AddChildButton onPress={handleOnPressAddChild}>
          <Image
            source={Images.IcAdd}
            width={16}
            height={16}
            style={{tintColor: COLORS.Blue}}
          />
          <Text
            marginLeft={16}
            fontSize={16}
            fontWeight="600"
            lineHeight={24}
            color={COLORS.Blue}>
            Add a child
          </Text>
        </AddChildButton>
      </ItemContainer>
    );
  };

  const toolbar = () => {
    const handleLogoutUser = async () => {
      startCloseAnimation();
      doHapticFeedback();
      await dispatch(userActions.logout());
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: NAV_ROUTES.authNavigationStack}],
        }),
      );
    };

    return (
      <ItemContainer disabled={true}>
        <Text
          fontSize={24}
          fontWeight="600"
          lineHeight={36}
          color={COLORS.Text.black}>
          {isReadOnly ? 'Profile' : 'Switch profiles'}
        </Text>
        <TouchableOpacity onPress={handleLogoutUser}>
          <Text
            fontSize={16}
            fontWeight="600"
            lineHeight={24}
            color={COLORS.Blue}>
            Log out
          </Text>
        </TouchableOpacity>
      </ItemContainer>
    );
  };

  const renderItem = useCallback(
    ({item, index}) => {
      let name = item?.firstName;
      let avatar = (
        <AvatarContainer>
          <ImageChildAvatar avatarId={item?.avatarId} width={26} height={26} />
        </AvatarContainer>
      );

      if (!isReadOnly && index === 0) {
        name = 'My Account';
        avatar = (
          <Image
            source={{url: item?.avatar}}
            width={26}
            height={26}
            style={styles.myAccountAvatar}
          />
        );
      }

      const isMyAccount = () => {
        const myAccount = !isReadOnly && index === 0;
        if (myAccount) {
          startCloseAnimation();
          navigation.navigate(NAV_ROUTES.myAccountProfileStackNavigator);
        }
        return myAccount;
      };

      const handleOnPressSettingsButton = () => {
        doHapticFeedback();
        startCloseAnimation();
        setTimeout(() => {
          if (!isMyAccount()) {
            onChildProfileSelected();
            navigation.navigate(NAV_ROUTES.settingsStackNavigator, {
              screen: NAV_ROUTES.settings,
              params: {
                showDeleteButton: true,
              },
            });
          }
        }, 600);
      };

      const onChildProfileSelected = (closeModal = false) => {
        doHapticFeedback();
        if (!isMyAccount()) {
          batch(() => {
            dispatch(childActions.setSelectedChild(item));
            dispatch(
              childActions.setSelectedDateToShowTask(
                moment().format('MM-DD-YYYY'),
              ),
            );
          });
          if (closeModal) toggleShowAnimation();
        }
      };

      return (
        <ItemContainer
          onPress={
            isReadOnly
              ? handleOnPressSettingsButton
              : () => onChildProfileSelected(true)
          }>
          <Profile>
            {avatar}
            <Text
              marginLeft={20}
              fontSize={18}
              fontWeight="600"
              lineHeight={27}
              color={COLORS.Text.black}>
              {name}
            </Text>
          </Profile>
          <SettingsButton onPress={handleOnPressSettingsButton}>
            <Image source={Images.IcSettings} width={24} height={24} />
          </SettingsButton>
        </ItemContainer>
      );
    },
    [isReadOnly],
  );

  const toggleShowAnimation = useCallback(() => {
    if (selectorHeight._value === 0) {
      startOpenAnimation();
    } else {
      startCloseAnimation();
    }
  }, [selectorHeight, startCloseAnimation, startOpenAnimation]);

  return (
    <SelectProfileContext.Provider
      value={{
        startCloseAnimation,
        startOpenAnimation,
      }}>
      <View
        style={[
          styles.backgroundContainer,
          !isVisible ? styles.hideBackground : {},
        ]}>
        <Animated.View
          style={{opacity: opacity}}
          {...panResponders.panHandlers}>
          <TouchableOpacity onPress={startCloseAnimation}>
            <BlurView
              style={[styles.blur]}
              blurType="dark"
              blurAmount={1}
              reducedTransparencyFallbackColor="white"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Animated.View
        style={[
          styles.selectorContainer,
          {
            height: selectorHeight,
          },
        ]}>
        <Container>
          <SafeAreaView edges={['top']} />
          {toolbar()}
          <FlatList
            data={isReadOnly ? [selectedChild] : [user, ...childList]}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={styles.profileList}
          />
          {footer()}
        </Container>
      </Animated.View>
      {children}
    </SelectProfileContext.Provider>
  );
};

const useSelectProvider = () => {
  const context = useContext(SelectProfileContext);
  console.log({context, SelectProfileContext});
  if (!context) {
    throw new Error('useContent must be used within SelectProfileContext');
  }
  return context;
};

const styles = StyleSheet.create({
  selectorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    overflow: 'hidden',
    zIndex: 100,
  },
  blur: {
    width: '100%',
    height: '100%',
  },
  hideBackground: {
    width: 0,
    height: 0,
    position: 'relative',
    zIndex: 0,
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  profileList: {
    maxHeight: 310,
  },
  myAccountAvatar: {
    overflow: 'hidden',
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: COLORS.White,
    borderWidth: 4,
    borderColor: COLORS.Blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {SelectProfileContext, SelectProfileProvider, useSelectProvider};
