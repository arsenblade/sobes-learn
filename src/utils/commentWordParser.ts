export const commentWordParse = (num: number) => {
  if (num === 0 || num > 4) return 'Комментариев';
  if (num === 1) return 'Комментарий';
  if (num > 1 && num < 5) return 'Комментария';
  return '';
};
