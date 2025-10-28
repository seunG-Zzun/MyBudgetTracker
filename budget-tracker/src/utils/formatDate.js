import dayjs from 'dayjs';

export const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatDisplayDate = (date) => {
  return dayjs(date).format('YYYY년 MM월 DD일');
};

export const getMonthYear = (date) => {
  return {
    year: dayjs(date).year(),
    month: dayjs(date).month()
  };
};

export const getCurrentMonth = () => {
  return {
    year: dayjs().year(),
    month: dayjs().month()
  };
};
