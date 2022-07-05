import React, {useState, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {AvatarListItem} from '../ListItems';
import {Avatars} from 'Constants';
import {ItemSeparator} from './styles';

const DATA = Object.values(Avatars);

const AvatarList = ({onAvatarSelected}) => {
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
      ItemSeparatorComponent={() => <ItemSeparator />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    flexGrow: 0,
  },
  contentContainerStyle: {
    width: 270,
    alignSelf: 'center',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    height: 110,
  },
});

export {AvatarList};
