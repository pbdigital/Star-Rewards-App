import moment from 'moment';

const dayFormat = 'ddd';

export const getCurrentWeekDays = () => {
  const numberOfWeeks = 3;
  const numberOfDays = 19;
  const days = [];
  const lastWeekStart = moment()
    .subtract(numberOfWeeks - 1, 'weeks')
    .startOf('week');
  console.log({lastWeekStart});
  for (let i = 0; i <= numberOfDays + 1; i++) {
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
