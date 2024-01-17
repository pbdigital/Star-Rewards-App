import {StyleSheet} from 'react-native';
import { COLORS } from '../../Constants';

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 10,
    flex: 1,
  },
  headerContainer: {
    
  },
  addImage: {
    tintColor: COLORS.Blue,
  },
  listContainer: {
    marginTop: 30,
    flexGrow: 1,
    paddingBottom: 150,
  },
  addButton: {
    height: 60,
    borderWidth: 2,
    borderColor: COLORS.Blue,
    backgroundColor: COLORS.White,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icHelp: {
    width: 30,
    height: 30,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default styles;
