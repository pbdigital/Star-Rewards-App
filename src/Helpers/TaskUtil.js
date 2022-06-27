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
