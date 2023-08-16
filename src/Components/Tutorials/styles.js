import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
  },
  message: {
    left: Dimensions.get('screen').width / 2 - (220 / 2),
    width: 220,
  },
  demoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  tabHoldStar: {
    opacity: 1,
    width: 110,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {styles};
