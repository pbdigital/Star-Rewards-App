import moment from 'moment';

const dayFormat = 'ddd';

export const getCurrentWeekDays = () => {
  const weekStart = moment().startOf('week');
  const days = [];
  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days'));
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
