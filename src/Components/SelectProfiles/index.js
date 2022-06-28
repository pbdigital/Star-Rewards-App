import React, {useState, useCallback, useEffect, useRef} from 'react';
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
import {childActions} from '../../Redux/Child/ChildSlice';
import {userActions} from '../../Redux/User/UserSlice';
import {Text} from '../Text';
import {Image} from '../Image';
import {Images} from './../../Assets/Images';
import {useDispatch, useSelector} from 'react-redux';
import {childListSelector} from '../../Redux/Child/ChildSelectors';
import {ImageChildAvatar} from '../ImageChildAvatar';
import {COLORS} from '../../Constants/Colors';
import {userInforSelector} from '../../Redux/User/UserSelectors';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {
  Container,
  SettingsButton,
  SafeAreaView,
  ItemContainer,
  AvatarContainer,
  Profile,
  AddChildButton,
} from './styles';

const DROPDOWN_MAX_HEIGHT = 472;

const SelectProfiles = ({isVisible, onCloseAnimation}) => {
  const dispatch = useDispatch();
  const user = useSelector(userInforSelector);
  const childList = useSelector(childListSelector);
  const navigation = useNavigation();
  const selectorHeight = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

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
  ]);

  useEffect(() => {
    if (isVisible) {
      startOpenAnimation();
    } else {
      startCloseAnimation();
    }
  }, [isVisible, startCloseAnimation, startOpenAnimation]);

  const startOpenAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(selectorHeight, {
        toValue: DROPDOWN_MAX_HEIGHT,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  }, [opacity, selectorHeight]);

  const startCloseAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(selectorHeight, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();

    if (onCloseAnimation) {
      onCloseAnimation();
    }
  }, [opacity, selectorHeight, onCloseAnimation]);

  const footer = () => {
    const handleOnPressAddChild = async () => {
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
      await dispatch(userActions.logout());
      navigation.navigate(NAV_ROUTES.login);
    };

    return (
      <ItemContainer disabled={true}>
        <Text
          fontSize={24}
          fontWeight="600"
          lineHeight={36}
          color={COLORS.Text.black}>
          Switch profiles
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

  const renderItem = ({item, index}) => {
    let name = item?.firstName;
    let avatar = (
      <ImageChildAvatar avatarId={item?.avatarId} width={26} height={26} />
    );

    if (index === 0) {
      name = 'My Account';
      avatar = <Image source={{url: item?.avatar}} width={26} height={26} />;
    }

    const isMyAccount = () => {
      const myAccount = index === 0;
      if (myAccount) {
        navigation.navigate(NAV_ROUTES.myAccountProfileStackNavigator);
      }
      return myAccount;
    };

    const handleOnPressSettingsButton = () => {
      startCloseAnimation();
      setTimeout(() => {
        if (!isMyAccount()) {
          onChildProfileSelected();
          navigation.navigate(NAV_ROUTES.settings, {
            showDeleteButton: true,
          });
        }
      }, 600);
    };

    const onChildProfileSelected = (closeModal = false) => {
      if (!isMyAccount()) {
        dispatch(childActions.setSelectedChild(item));
        if (closeModal) {
          toggleShowAnimation();
        }
      }
    };

    return (
      <ItemContainer onPress={() => onChildProfileSelected(true)}>
        <Profile>
          <AvatarContainer>{avatar}</AvatarContainer>
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
  };

  const toggleShowAnimation = useCallback(() => {
    if (selectorHeight._value === 0) {
      startOpenAnimation();
    } else {
      startCloseAnimation();
    }
  }, [selectorHeight, startCloseAnimation, startOpenAnimation]);

  return (
    <>
      <View
        style={[
          styles.backgroundContainer,
          !isVisible ? styles.hideBackground : {},
        ]}>
        <Animated.View
          style={{opacity: opacity}}
          {...panResponders.panHandlers}>
          <BlurView
            style={[styles.blur]}
            blurType="dark"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
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
            data={[user, ...childList]}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={styles.profileList}
          />
          {footer()}
        </Container>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    overflow: 'hidden',
  },
  blur: {
    width: '100%',
    height: '100%',
  },
  hideBackground: {
    width: 0,
    height: 0,
    position: 'relative',
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  profileList: {
    maxHeight: 267,
  },
});

export {SelectProfiles};
