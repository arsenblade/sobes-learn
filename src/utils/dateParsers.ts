export const dateToString = (date: Date) => {
  const month = date.getMonth();
  return `${date.getDate()}-${month + 1 < 10 ? '0' : ''}${month + 1}-${date.getFullYear()}`;
};

export const isoToSTring = (isoDate: string) => {
  const date = new Date(isoDate);
  return dateToString(date);
};

export const stringToText = (isoDate: string) => {
  const secs = (new Date().valueOf() - new Date(isoDate).valueOf()) / 1000;
  if (secs < 60) return 'только что';
  if (secs < 3600) return `${Math.floor(secs / 60)} ${minutesToString(Math.floor(secs / 60))} назад`;
  if (secs < 3600 * 24) return `${Math.floor(secs / 3600)} ${hoursToString(Math.floor(secs / 3600))} назад`;
  if (secs < 86400 * 7) return `${Math.floor(secs / 86400)} ${daysToString(Math.floor(secs / 86400))} назад`;
  if (secs < 86400 * 31) return `${Math.floor(secs / 604800)} ${weeksToString(Math.floor(secs / 604800))} назад`;
  if (secs < 86400 * 365) return `${Math.floor(secs / 2678400)} ${monthsToString(Math.floor(secs / 2678400))} назад`;
  return `${Math.floor(secs / 31536000)} ${yearsToString(Math.floor(secs / 31536000))} назад`;
};

export const minutesToString = (min: number) => {
  if (min === 1) return 'минуту';
  if (min % 10 > 1 && min % 10 < 5 && (min < 10 || min > 20)) return 'минуты';
  if ((min % 10 > 4 && min % 10 < 21) || min % 10 > 4 || min % 10 < 9) return 'минут';
  return '';
};

export const hoursToString = (hour: number) => {
  if (hour === 1) return 'час';
  if (hour % 10 > 1 && hour % 10 < 5 && (hour < 10 || hour > 20)) return 'часа';
  if (hour > 4) return 'часов';
  return '';
};

export const daysToString = (day: number) => {
  if (day === 1) return 'день';
  if (day > 1 && day < 5) return 'дня';
  return 'дней';
};

export const weeksToString = (week: number) => {
  if (week === 1) return 'неделю';
  if (week > 1 && week < 5) return 'недели';
  return 'недель';
};

export const monthsToString = (month: number) => {
  if (month === 1) return 'месяц';
  if (month > 1 && month < 5) return 'месяца';
  return 'месяцев';
};

export const yearsToString = (year: number) => {
  if (year === 1) return 'год';
  if (year > 1 && year < 5) return 'года';
  return 'лет';
};
