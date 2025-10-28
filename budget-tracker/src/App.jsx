import { useState } from 'react';
import { useLocalStorage, useRecurringExpenses } from './hooks/useLocalStorage';
import Home from './pages/Home';
import Stats from './pages/Stats';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { records, addRecord, updateRecord, deleteRecord } = useLocalStorage();
  const { 
    recurringExpenses, 
    addRecurringExpense, 
    updateRecurringExpense, 
    deleteRecurringExpense 
  } = useRecurringExpenses();

  return (
    <div className="min-h-screen bg-navy-500">
      {/* Navigation Header */}
      <header className="glass-card mx-4 mt-4 mb-6 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl font-bold">
            💰
          </div>
          <h1 className="text-2xl font-bold text-white">나만의 가계부</h1>
        </div>
        
        <nav className="flex items-center gap-6">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentPage === 'home'
                ? 'bg-orange-500 text-white glow-orange'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            내역
          </button>
          <button
            onClick={() => setCurrentPage('stats')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentPage === 'stats'
                ? 'bg-orange-500 text-white glow-orange'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            통계
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {currentPage === 'home' ? (
          <Home
            records={records}
            addRecord={addRecord}
            updateRecord={updateRecord}
            deleteRecord={deleteRecord}
            recurringExpenses={recurringExpenses}
            addRecurringExpense={addRecurringExpense}
            updateRecurringExpense={updateRecurringExpense}
            deleteRecurringExpense={deleteRecurringExpense}
          />
        ) : (
          <Stats records={records} />
        )}
      </main>
    </div>
  );
}

export default App;
