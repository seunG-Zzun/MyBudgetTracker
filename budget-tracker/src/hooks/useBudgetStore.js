import { useCallback, useEffect, useMemo, useReducer } from 'react';

const RECORDS_STORAGE_KEY = 'budgetRecords';
const RECURRING_STORAGE_KEY = 'recurringExpenses';

const initialState = {
  records: [],
  recurringExpenses: []
};

const budgetReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_RECORD':
      return {
        ...state,
        records: [...state.records, action.payload]
      };
    case 'UPDATE_RECORD':
      return {
        ...state,
        records: state.records.map((record) =>
          record.id === action.payload.id ? { ...record, ...action.payload.updates } : record
        )
      };
    case 'DELETE_RECORD':
      return {
        ...state,
        records: state.records.filter((record) => record.id !== action.payload)
      };
    case 'ADD_RECURRING_EXPENSE':
      return {
        ...state,
        recurringExpenses: [...state.recurringExpenses, action.payload]
      };
    case 'UPDATE_RECURRING_EXPENSE':
      return {
        ...state,
        recurringExpenses: state.recurringExpenses.map((expense) =>
          expense.id === action.payload.id ? { ...expense, ...action.payload.updates } : expense
        )
      };
    case 'DELETE_RECURRING_EXPENSE':
      return {
        ...state,
        recurringExpenses: state.recurringExpenses.filter((expense) => expense.id !== action.payload)
      };
    default:
      return state;
  }
};

const readFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.warn(`Failed to read ${key} from localStorage`, error);
    return fallback;
  }
};

const writeToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to write ${key} to localStorage`, error);
  }
};

const initializer = () => ({
  records: readFromStorage(RECORDS_STORAGE_KEY, []),
  recurringExpenses: readFromStorage(RECURRING_STORAGE_KEY, [])
});

export const useBudgetStore = () => {
  const [state, dispatch] = useReducer(budgetReducer, initialState, initializer);

  useEffect(() => {
    writeToStorage(RECORDS_STORAGE_KEY, state.records);
  }, [state.records]);

  useEffect(() => {
    writeToStorage(RECURRING_STORAGE_KEY, state.recurringExpenses);
  }, [state.recurringExpenses]);

  const addRecord = useCallback(
    (record) => dispatch({ type: 'ADD_RECORD', payload: record }),
    []
  );

  const updateRecord = useCallback(
    (id, updates) => dispatch({ type: 'UPDATE_RECORD', payload: { id, updates } }),
    []
  );

  const deleteRecord = useCallback(
    (id) => dispatch({ type: 'DELETE_RECORD', payload: id }),
    []
  );

  const addRecurringExpense = useCallback(
    (expense) => dispatch({ type: 'ADD_RECURRING_EXPENSE', payload: expense }),
    []
  );

  const updateRecurringExpense = useCallback(
    (id, updates) => dispatch({ type: 'UPDATE_RECURRING_EXPENSE', payload: { id, updates } }),
    []
  );

  const deleteRecurringExpense = useCallback(
    (id) => dispatch({ type: 'DELETE_RECURRING_EXPENSE', payload: id }),
    []
  );

  return useMemo(
    () => ({
      records: state.records,
      recurringExpenses: state.recurringExpenses,
      addRecord,
      updateRecord,
      deleteRecord,
      addRecurringExpense,
      updateRecurringExpense,
      deleteRecurringExpense
    }),
    [
      state.records,
      state.recurringExpenses,
      addRecord,
      updateRecord,
      deleteRecord,
      addRecurringExpense,
      updateRecurringExpense,
      deleteRecurringExpense
    ]
  );
};

