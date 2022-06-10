import React, {useCallback, useEffect, useRef} from 'react';
import {
  Easing,
  Animated,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {Text} from '../Text';
import {Image} from '../Image';
import {Images} from './../../Assets/Images';
import {useSelector} from 'react-redux';
import {childListSelector} from '../../Redux/Child/ChildSelectors';
import {ImageChildAvatar} from '../ImageChildAvatar';
import {
  Container,
  SettingsButton,
  SafeAreaView,
  ItemContainer,
  AvatarContainer,
  Profile,
  AddChildButton,
} from './styles';
import {COLORS} from '../../Constants/Colors';
import {userInforSelector} from '../../Redux/User/UserSelectors';

const SelectProfiles = ({isVisible, onCloseAnimation}) => {
  const user = useSelector(userInforSelector);
  const childList = useSelector(childListSelector);
  const height = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      startOpenAnimation();
    } else {
      startCloseAnimation();
    }
  }, [isVisible]);

  const startOpenAnimation = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 1,
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
  };
  const startCloseAnimation = () => {
    Animated.parallel([
      Animated.timing(height, {
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
  };

  const footer = () => {
    return (
      <ItemContainer justifyContent="center" borderNone>
        <AddChildButton>
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
    return (
      <ItemContainer>
        <Text
          fontSize={24}
          fontWeight="600"
          lineHeight={36}
          color={COLORS.Text.black}>
          Switch profiles
        </Text>
        <TouchableOpacity>
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
    console.log({item});
    let name = item?.firstName;
    let avatar = (
      <ImageChildAvatar avatarId={item.avatarId} width={26} height={26} />
    );

    if (index === 0) {
      name = 'My Account';
      avatar = <Image source={{url: item?.avatar}} width={26} height={26} />;
    }

    return (
      <ItemContainer>
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
        <SettingsButton>
          <Image source={Images.IcSettings} width={24} height={24} />
        </SettingsButton>
      </ItemContainer>
    );
  };

  const maxHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 472],
  });

  const toggleShowAnimation = useCallback(() => {
    if (height._value === 0) {
      startOpenAnimation();
    } else {
      startCloseAnimation();
      if (onCloseAnimation) {
        onCloseAnimation();
      }
    }
  }, [height]);

  return (
    <>
      <Pressable
        onPress={toggleShowAnimation}
        style={[
          styles.backgroundContainer,
          !isVisible ? styles.hideBackground : {},
        ]}>
        <Animated.View style={{opacity: opacity}}>
          <BlurView
            style={[styles.blur]}
            blurType="dark"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[
          styles.selectorContainer,
          {
            height: maxHeight,
          },
        ]}>
        <Container>
          <SafeAreaView edges={['top']} />
          {toolbar()}
          <FlatList
            data={[user, ...childList]}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={{maxHeight: 267}}
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
});

export {SelectProfiles};