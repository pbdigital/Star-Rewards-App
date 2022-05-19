import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {AvatarListItem} from '../ListItems';
import {Avatars} from '../../Constants/Avatars';
import {ItemSeparator} from './styles';

const DATA = Object.values(Avatars);

const AvatarList = () => {
  const renderItem = ({item, index, separators}) => (
    <AvatarListItem avatar={item} />
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
