import { useState, useEffect } from 'react';

const STORAGE_KEY = 'budgetRecords';
const RECURRING_KEY = 'recurringExpenses';

export const useLocalStorage = () => {
  const [records, setRecords] = useState(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const addRecord = (record) => {
    setRecords(prev => [...prev, record]);
  };

  const updateRecord = (id, updatedRecord) => {
    setRecords(prev => 
      prev.map(record => record.id === id ? updatedRecord : record)
    );
  };

  const deleteRecord = (id) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  return {
    records,
    addRecord,
    updateRecord,
    deleteRecord,
    setRecords
  };
};

export const useRecurringExpenses = () => {
  const [recurringExpenses, setRecurringExpenses] = useState(() => {
    const storedData = localStorage.getItem(RECURRING_KEY);
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem(RECURRING_KEY, JSON.stringify(recurringExpenses));
  }, [recurringExpenses]);

  const addRecurringExpense = (expense) => {
    setRecurringExpenses(prev => [...prev, expense]);
  };

  const updateRecurringExpense = (id, updatedExpense) => {
    setRecurringExpenses(prev => 
      prev.map(expense => expense.id === id ? updatedExpense : expense)
    );
  };

  const deleteRecurringExpense = (id) => {
    setRecurringExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return {
    recurringExpenses,
    addRecurringExpense,
    updateRecurringExpense,
    deleteRecurringExpense,
    setRecurringExpenses
  };
};



