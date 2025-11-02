import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import RecordForm from '../components/RecordForm';
import RecordList from '../components/RecordList';
import FilterBar from '../components/FilterBar';
import RecurringExpense from '../components/RecurringExpense';
import SummaryCards from '../components/dashboard/SummaryCards';
import CategorySummary from '../components/dashboard/CategorySummary';
import ViewModeControls from '../components/home/ViewModeControls';
import { useBudget } from '../context/BudgetContext';
import { Categories } from '../types';

const defaultFilters = {
  type: '',
  category: '',
  startDate: '',
  endDate: ''
};

const Home = () => {
  const {
    records,
    addRecord,
    updateRecord,
    deleteRecord,
    recurringExpenses,
    addRecurringExpense,
    updateRecurringExpense,
    deleteRecurringExpense
  } = useBudget();

  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [viewMode, setViewMode] = useState('day');
  const [filters, setFilters] = useState(defaultFilters);

  const filteredRecords = useMemo(() => {
    const selected = dayjs(selectedDate);

    return records
      .filter((record) => {
        const recordDate = dayjs(record.date);

        if (viewMode === 'day' && !recordDate.isSame(selected, 'day')) {
          return false;
        }

        if (viewMode === 'month' && !recordDate.isSame(selected, 'month')) {
          return false;
        }

        if (viewMode === 'year' && !recordDate.isSame(selected, 'year')) {
          return false;
        }

        if (viewMode === 'range') {
          if (filters.startDate && recordDate.isBefore(dayjs(filters.startDate))) {
            return false;
          }
          if (filters.endDate && recordDate.isAfter(dayjs(filters.endDate))) {
            return false;
          }
        }

        if (filters.type && record.type !== filters.type) {
          return false;
        }

        if (filters.category && record.category !== filters.category) {
          return false;
        }

        return true;
      })
      .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
  }, [records, selectedDate, viewMode, filters]);

  const summary = useMemo(() => {
    const income = filteredRecords
      .filter((record) => record.type === 'income')
      .reduce((sum, record) => sum + record.amount, 0);
    const expense = filteredRecords
      .filter((record) => record.type === 'expense')
      .reduce((sum, record) => sum + record.amount, 0);
    return { income, expense, total: income - expense };
  }, [filteredRecords]);

  const categorySummary = useMemo(() => {
    const accumulator = {};
    filteredRecords
      .filter((record) => record.type === 'expense')
      .forEach((record) => {
        accumulator[record.category] = (accumulator[record.category] || 0) + record.amount;
      });

    return Object.entries(accumulator)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [filteredRecords]);

  const availableCategories = useMemo(() => {
    if (filters.type && Categories[filters.type]) {
      return Categories[filters.type];
    }
    return Array.from(new Set([...Categories.income, ...Categories.expense]));
  }, [filters.type]);

  const handleEditRecord = (record) => setEditingRecord(record);

  const handleCancelEdit = () => setEditingRecord(null);

  const handleUpdateRecord = (id, updatedRecord) => {
    updateRecord(id, updatedRecord);
    setEditingRecord(null);
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteRecord(id);
    }
  };

  const handleFilterChange = (nextFilters) => {
    if (nextFilters.type && !Categories[nextFilters.type]?.includes(nextFilters.category)) {
      setFilters({ ...nextFilters, category: '' });
      return;
    }
    setFilters(nextFilters);
  };

  const handleApplyRecurring = (record) => {
    addRecord({ ...record, date: selectedDate });
  };

  return (
    <div className="relative py-8">
      <div className="absolute top-20 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            나만의 가계부
          </h1>
          <p className="text-lg text-gray-400">수입과 지출을 간편하게 관리하세요</p>
        </div>

        <div className="space-y-8">
          <RecordForm
            onAddRecord={addRecord}
            editingRecord={editingRecord}
            onUpdateRecord={handleUpdateRecord}
            onCancelEdit={handleCancelEdit}
          />

          <ViewModeControls
            viewMode={viewMode}
            selectedDate={selectedDate}
            onViewModeChange={setViewMode}
            onSelectedDateChange={setSelectedDate}
            filters={filters}
            onFiltersChange={handleFilterChange}
            recordCount={filteredRecords.length}
          />

          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            availableCategories={availableCategories}
            showDateRange={viewMode === 'range'}
          />

          {filteredRecords.length > 0 && (
            <>
              <SummaryCards summary={summary} />
              <CategorySummary categories={categorySummary} totalExpense={summary.expense} />
            </>
          )}

          <RecordList records={filteredRecords} onEdit={handleEditRecord} onDelete={handleDeleteRecord} />

          <RecurringExpense
            recurringExpenses={recurringExpenses}
            addRecurringExpense={addRecurringExpense}
            updateRecurringExpense={updateRecurringExpense}
            deleteRecurringExpense={deleteRecurringExpense}
            onApplyToRecords={handleApplyRecurring}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

