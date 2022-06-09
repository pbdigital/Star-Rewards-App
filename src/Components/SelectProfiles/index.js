import React from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
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

const SelectProfiles = () => {
  const childList = useSelector(childListSelector);

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

  const renderItem = ({item}) => {
    console.log({item});
    return (
      <ItemContainer>
        <Profile>
          <AvatarContainer>
            <ImageChildAvatar avatarId={item.avatarId} width={26} height={26} />
          </AvatarContainer>
          <Text
            marginLeft={20}
            fontSize={18}
            fontWeight="600"
            lineHeight={27}
            color={COLORS.Text.black}>
            {item.firstName}
          </Text>
        </Profile>
        <SettingsButton>
          <Image source={Images.IcSettings} width={24} height={24} />
        </SettingsButton>
      </ItemContainer>
    );
  };

  return (
    <BlurView
      style={styles.blur}
      blurType="dark"
      blurAmount={1}
      reducedTransparencyFallbackColor="white">
      <SafeAreaView edges={['top']} />
      <Container>
        {toolbar()}
        <FlatList
          data={childList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        {footer()}
      </Container>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blur: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export {SelectProfiles};
