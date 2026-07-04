export const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};


const pad2 = (value: number): string => (value < 10 ? `0${value}` : String(value));


export const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  return `${year}-${month}-${day}`;
};


export const getTodayLocalDate = (): string => formatLocalDate(new Date());


export const addDaysLocal = (dateStr: string, days: number): string => {
  const date = parseLocalDate(dateStr);
  date.setDate(date.getDate() + days);
  return formatLocalDate(date);
};
