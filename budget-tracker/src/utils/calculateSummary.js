import dayjs from 'dayjs';

export const getMonthlySummary = (records, year, month) => {
  const filtered = records.filter(r => {
    const recordDate = dayjs(r.date);
    return recordDate.year() === year && recordDate.month() === month;
  });
  
  const income = filtered
    .filter(r => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0);
    
  const expense = filtered
    .filter(r => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0);
    
  return { income, expense };
};

export const getCategorySummary = (records, year, month) => {
  const filtered = records.filter(r => {
    const recordDate = dayjs(r.date);
    return recordDate.year() === year && recordDate.month() === month && r.type === 'expense';
  });
  
  const categoryMap = {};
  filtered.forEach(r => {
    if (!categoryMap[r.category]) {
      categoryMap[r.category] = 0;
    }
    categoryMap[r.category] += r.amount;
  });
  
  return Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value
  }));
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ko-KR').format(amount);
};



