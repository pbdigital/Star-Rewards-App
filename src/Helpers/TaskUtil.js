import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import SoundPlayer from 'react-native-sound-player';
import {HAPTIC_DEFAULT_OPTIONS, HAPTIC_METHODS} from 'Constants';
import {getTaskForTheDay} from './CalendarUtils';

export const getTaskPercentageCompleted = ({tasks, date}) => {
  const tasktForTheDay = getTaskForTheDay({tasks, day: date.format('ddd')});
  const completedTasks = tasktForTheDay.reduce((prev, {daysCompleted}, cur) => {
    const today = date.format('YYYY-MM-DD');
    const findInArray = daysCompleted || [];
    if (findInArray.includes(today)) {
      return prev + 1;
    }
    return prev;
  }, 0);
  return (completedTasks / tasktForTheDay.length) * 100;
};

export const playSound = (filename, fileType) => {
  try {
    SoundPlayer.playSoundFile(filename, fileType);
  } catch (e) {
    console.log('cannot play the sound file', e);
  }
};

export const doHapticFeedback = method => {
  ReactNativeHapticFeedback.trigger(
    method || HAPTIC_METHODS.impactLight,
    HAPTIC_DEFAULT_OPTIONS,
  );
};

export const getCompletedTaskByDate = (tasks = [], strDate) => {
  const taskToFilter = tasks || [];
  const filteredTasks = taskToFilter.filter(({date}) => date === strDate);
  return filteredTasks;
};
