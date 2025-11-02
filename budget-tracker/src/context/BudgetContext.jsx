import { createContext, useContext } from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';

const BudgetContext = createContext(null);

export const BudgetProvider = ({ children }) => {
  const store = useBudgetStore();
  return <BudgetContext.Provider value={store}>{children}</BudgetContext.Provider>;
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};