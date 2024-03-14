import moment from 'moment';

const dayFormat = 'ddd';

export const getCurrentWeekDays = () => {
  const days = [];
  const lastWeekStart = moment().subtract(1, 'weeks').startOf('week');
  for (let i = 0; i <= 12; i++) {
    days.push(moment(lastWeekStart).add(i, 'days'));
  }
  return days;
};

export const getTaskForTheDay = ({tasks, day = moment().format(dayFormat)}) => {
  const weekDays = getCurrentWeekDays().map(weekDay =>
    weekDay.format(dayFormat),
  );
  const iCurrentDayOfTheWeek = weekDays.indexOf(`${day}`);
  const tasksList = tasks || [];
  const tasksForTheDay = tasksList?.filter(task =>
    task?.daysofWeek.includes(iCurrentDayOfTheWeek),
  );
  return tasksForTheDay;
};
