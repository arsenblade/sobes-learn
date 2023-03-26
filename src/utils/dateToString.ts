export const dateToString = (date: Date) => `${date.getDate()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getFullYear()}`;
