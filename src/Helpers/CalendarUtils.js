import moment from 'moment';

export const getCurrentWeekDays = () => {
  const weekStart = moment().startOf('week');
  const days = [];
  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days'));
  }
  return days;
};
