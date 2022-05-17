import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {MonsterListItem} from '../ListItems/MonsterListItem';
import {ItemSeparator} from './styles';

const DATA = Array.from(new Array(8)).map((val, index) => {
  return {
    id: `my-monster-${index}`,
  };
});

const MonsterList = () => {
  const renderItem = ({item, index, separators}) => {
    console.log({item, index});
    return <MonsterListItem key={`${index}-monsters`} />;
  };

  return (
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      columnWrapperStyle={styles.columnWrapperStyle}
      style={styles.list}
      data={DATA}
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

export {MonsterList};
