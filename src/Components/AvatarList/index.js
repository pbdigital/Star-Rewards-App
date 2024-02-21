import React, {useState, useCallback} from 'react';
import {FlatList, Image, StyleSheet} from 'react-native';
import {AvatarListItem} from '../ListItems';
import {Avatars, COLORS} from 'Constants';
import {ItemSeparator} from './styles';
import {EmptyListState} from '../EmptyListState';
import {Images} from 'src/Assets/Images';
import {Text} from '../Text';

const DATA = Object.values(Avatars);

const AvatarList = ({onAvatarSelected, name}) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);

  const handleOnAvatarSelected = useCallback(
    avatarId => {
      setSelectedAvatarId(avatarId);
      if (onAvatarSelected) {
        onAvatarSelected(avatarId);
      }
    },
    [setSelectedAvatarId, onAvatarSelected],
  );

  const renderItem = useCallback(
    ({item, index, separators}) => (
      <AvatarListItem
        avatar={item}
        handleOnAvatarSelected={handleOnAvatarSelected}
        isSelected={selectedAvatarId === item.id}
      />
    ),
    [handleOnAvatarSelected, selectedAvatarId],
  );

  const renderItemSeparator = () => <ItemSeparator />;

  return (
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      columnWrapperStyle={styles.columnWrapperStyle}
      style={styles.list}
      data={DATA}
      keyExtractor={item => `monster-avatar-${item.id}`}
      renderItem={renderItem}
      horizontal={false}
      numColumns={2}
      ItemSeparatorComponent={renderItemSeparator}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <EmptyListState
          message={
            <Text
              textAlign="center"
              fontSize={14}
              lineHeight={22}
              color={COLORS.Text.black}
              fontWeight="400">
              Monstrously exciting choices await! Let's give
              <Text
                textAlign="center"
                fontSize={14}
                lineHeight={22}
                color={COLORS.Text.black}
                fontWeight="600"
                style={styles.welcomeText}>
                {` ${name} `}
              </Text>
              a cute and cuddly monster companion on this sky-high adventure.
            </Text>
          }
          footerNote={
            "Pick an adorable monster pal that resonates with your little one's style – from fluffy furballs to giggly goofsters. Each one is a perfect partner for their journey to cloud-nine success!\n\nReady to introduce your star to their new friend? Swipe through our charming collection of monster avatars below and bring an extra dose of cheer to their sky-filled voyage!"
          }
          starImage={
            <Image source={Images.StarryAvatar} width={223} height={160} />
          }
          starImageContainer={{
            marginTop: -20,
          }}
          contentContainerStyle={styles.emptyListStateContentContainerStyle}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    flexGrow: 0,
  },
  contentContainerStyle: {
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 50,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    width: 270,
    height: 110,
    alignSelf: 'center',
  },
  emptyListStateContentContainerStyle: {
    paddingBottom: 40,
  },
});

export {AvatarList};
