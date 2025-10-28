import { useState, useEffect } from 'react';

const STORAGE_KEY = 'budgetRecords';

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



