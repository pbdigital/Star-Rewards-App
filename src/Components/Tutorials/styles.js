import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  message: {
    left: Dimensions.get('screen').width / 2 - (220 / 2),
    width: 220,
  },
});

export {styles};
