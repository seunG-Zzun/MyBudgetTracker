import { useState, useMemo } from 'react';
import RecordForm from '../components/RecordForm';
import RecordList from '../components/RecordList';
import FilterBar from '../components/FilterBar';
import RecurringExpense from '../components/RecurringExpense';
import { Categories } from '../types';
import { formatCurrency } from '../utils/calculateSummary';
import dayjs from 'dayjs';

const Home = ({ 
  records, 
  addRecord, 
  updateRecord, 
  deleteRecord,
  recurringExpenses,
  addRecurringExpense,
  updateRecurringExpense,
  deleteRecurringExpense
}) => {
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [viewMode, setViewMode] = useState('day'); // 'day', 'month', 'year', 'range'
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    startDate: '',
    endDate: ''
  });

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const recordDate = dayjs(record.date);
      
      // 뷰 모드에 따른 필터링
      if (viewMode === 'day') {
        if (recordDate.format('YYYY-MM-DD') !== selectedDate) return false;
      } else if (viewMode === 'month') {
        if (recordDate.format('YYYY-MM') !== selectedDate.slice(0, 7)) return false;
      } else if (viewMode === 'year') {
        if (recordDate.format('YYYY') !== selectedDate.slice(0, 4)) return false;
      } else if (viewMode === 'range') {
        // 범위 선택 모드
        if (filters.startDate && recordDate.isBefore(dayjs(filters.startDate))) return false;
        if (filters.endDate && recordDate.isAfter(dayjs(filters.endDate))) return false;
      }
      
      // 타입 필터
      if (filters.type && record.type !== filters.type) return false;
      
      // 카테고리 필터
      if (filters.category && record.category !== filters.category) return false;
      
      return true;
    }).sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
  }, [records, selectedDate, viewMode, filters]);

  const handleAddRecord = (record) => {
    addRecord(record);
  };

  const handleUpdateRecord = (id, updatedRecord) => {
    updateRecord(id, updatedRecord);
    setEditingRecord(null);
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteRecord(id);
    }
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePreviousDay = () => {
    setSelectedDate(dayjs(selectedDate).subtract(1, 'day').format('YYYY-MM-DD'));
  };

  const handleNextDay = () => {
    setSelectedDate(dayjs(selectedDate).add(1, 'day').format('YYYY-MM-DD'));
  };

  const handleToday = () => {
    setSelectedDate(dayjs().format('YYYY-MM-DD'));
    setViewMode('day');
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setViewMode('day');
  };

  const handleMonthChange = (e) => {
    setSelectedDate(e.target.value);
    setViewMode('month');
  };

  const handleYearChange = (e) => {
    setSelectedDate(e.target.value);
    setViewMode('year');
  };

  const isToday = dayjs(selectedDate).isSame(dayjs(), 'day');
  const isFuture = dayjs(selectedDate).isAfter(dayjs());
  
  // 금액 합계 계산
  const summary = useMemo(() => {
    const income = filteredRecords
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);
    const expense = filteredRecords
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);
    return { income, expense, total: income - expense };
  }, [filteredRecords]);

  // 카테고리별 지출 요약
  const categorySummary = useMemo(() => {
    const map = {};
    filteredRecords
      .filter(r => r.type === 'expense')
      .forEach(r => {
        if (!map[r.category]) map[r.category] = 0;
        map[r.category] += r.amount;
      });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // 상위 5개
  }, [filteredRecords]);
  
  // 뷰 모드에 따른 표시 텍스트
  const getDisplayText = () => {
    if (viewMode === 'day') {
      return isToday ? '오늘' : dayjs(selectedDate).format('YYYY년 M월 D일');
    } else if (viewMode === 'month') {
      return dayjs(selectedDate).format('YYYY년 M월');
    } else if (viewMode === 'year') {
      return dayjs(selectedDate).format('YYYY년');
    } else if (viewMode === 'range') {
      if (filters.startDate && filters.endDate) {
        return `${dayjs(filters.startDate).format('YYYY.MM.DD')} ~ ${dayjs(filters.endDate).format('YYYY.MM.DD')}`;
      } else if (filters.startDate) {
        return `${dayjs(filters.startDate).format('YYYY.MM.DD')} ~`;
      }
      return '범위 선택';
    }
  };

  return (
    <div className="relative py-8">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            나만의 가계부
          </h1>
          <p className="text-lg text-gray-400">수입과 지출을 간편하게 관리하세요</p>
        </div>

        <div className="space-y-8">
          <RecordForm
            onAddRecord={handleAddRecord}
            editingRecord={editingRecord}
            onUpdateRecord={handleUpdateRecord}
            onCancelEdit={handleCancelEdit}
          />

          {/* 날짜 네비게이션 */}
          <div className="glass-card p-6">
            {/* 뷰 모드 전환 버튼 */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setViewMode('day')}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
                  viewMode === 'day'
                    ? 'bg-orange-500 text-white glow-orange'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                일별
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
                  viewMode === 'month'
                    ? 'bg-orange-500 text-white glow-orange'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                월별
              </button>
              <button
                onClick={() => setViewMode('year')}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
                  viewMode === 'year'
                    ? 'bg-orange-500 text-white glow-orange'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                연도별
              </button>
              <button
                onClick={() => setViewMode('range')}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
                  viewMode === 'range'
                    ? 'bg-orange-500 text-white glow-orange'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                날짜 선택
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {viewMode === 'day' && (
                  <>
                    <button
                      onClick={handlePreviousDay}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white font-bold text-lg"
                    >
                      ◀
                    </button>
                    <div className="text-center">
                      <button
                        onClick={handleToday}
                        className={`px-6 py-3 rounded-xl transition-all font-bold text-xl ${
                          isToday 
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white glow-orange' 
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        {getDisplayText()}
                        {isToday && ' ✓'}
                      </button>
                    </div>
                    <button
                      onClick={handleNextDay}
                      disabled={isFuture}
                      className={`px-4 py-2 rounded-xl transition-all text-white font-bold text-lg ${
                        isFuture 
                          ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      ▶
                    </button>
                  </>
                )}
                
                {(viewMode === 'month' || viewMode === 'year') && (
                  <div className="flex items-center gap-3">
                    {viewMode === 'month' ? (
                      <input
                        type="month"
                        value={selectedDate.slice(0, 7)}
                        onChange={(e) => handleMonthChange({ target: { value: e.target.value + '-01' } })}
                        className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
                      />
                    ) : (
                      <input
                        type="number"
                        value={selectedDate.slice(0, 4)}
                        onChange={(e) => handleYearChange({ target: { value: e.target.value + '-01-01' } })}
                        className="px-4 py-3 w-32 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
                        min="2000"
                        max="2100"
                      />
                    )}
                    <button
                      onClick={handleToday}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-sm"
                    >
                      오늘
                    </button>
                  </div>
                )}
                
                {viewMode === 'range' && (
                  <div className="flex items-center gap-3">
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm text-sm"
                    />
                    <span className="text-gray-400 font-bold">~</span>
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm text-sm"
                    />
                  </div>
                )}
              </div>

              {/* 날짜 표시 */}
              {viewMode === 'day' && (
                <div className="text-right">
                  <p className="text-gray-400 text-sm">
                    {dayjs(selectedDate).format('dddd')}
                  </p>
                </div>
              )}
              
              {viewMode === 'month' && (
                <div className="text-right">
                  <p className="text-gray-400 text-sm">
                    {dayjs(selectedDate).format('MMMM')}
                  </p>
                </div>
              )}
              
              {viewMode === 'year' && (
                <div className="text-right">
                  <p className="text-gray-400 text-sm">
                    {filteredRecords.length}개 내역
                  </p>
                </div>
              )}
              
              {viewMode === 'range' && (
                <div className="text-right">
                  <p className="text-gray-400 text-sm">
                    {filteredRecords.length}개 내역
                  </p>
                </div>
              )}
            </div>

            {/* 필터 바 */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">구분</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
                  >
                    <option value="" className="bg-navy-800">전체</option>
                    <option value="income" className="bg-navy-800">수입</option>
                    <option value="expense" className="bg-navy-800">지출</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">카테고리</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
                  >
                    <option value="" className="bg-navy-800">전체</option>
                    {filters.type && Categories[filters.type]?.map(cat => (
                      <option key={cat} value={cat} className="bg-navy-800">{cat}</option>
                    ))}
                    {!filters.type && (
                      <>
                        {Categories.income.map(cat => (
                          <option key={cat} value={cat} className="bg-navy-800">{cat}</option>
                        ))}
                        {Categories.expense.map(cat => (
                          <option key={cat} value={cat} className="bg-navy-800">{cat}</option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 요약 카드 */}
          {filteredRecords.length > 0 && (
            <div className="glass-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📈</span>
                    <p className="text-sm text-gray-300 font-semibold">수입</p>
                  </div>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(summary.income)}원</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📉</span>
                    <p className="text-sm text-gray-300 font-semibold">지출</p>
                  </div>
                  <p className="text-2xl font-bold text-red-400">{formatCurrency(summary.expense)}원</p>
                </div>
                <div className={`p-4 rounded-xl border ${
                  summary.total >= 0 
                    ? 'bg-blue-500/10 border-blue-500/30' 
                    : 'bg-orange-500/10 border-orange-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{summary.total >= 0 ? '💰' : '⚠️'}</span>
                    <p className="text-sm text-gray-300 font-semibold">순계</p>
                  </div>
                  <p className={`text-2xl font-bold ${summary.total >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                    {formatCurrency(summary.total)}원
                  </p>
                </div>
              </div>

              {/* 카테고리별 지출 요약 */}
              {categorySummary.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-3">카테고리별 지출</p>
                  <div className="space-y-2">
                    {categorySummary.map((cat, idx) => {
                      const totalExpense = summary.expense;
                      const percentage = totalExpense > 0 ? (cat.value / totalExpense * 100).toFixed(1) : 0;
                      return (
                        <div key={cat.name} className="flex items-center gap-3">
                          <div className="flex items-center gap-2 min-w-[80px]">
                            <span className="text-orange-400">●</span>
                            <p className="text-sm text-gray-300">{cat.name}</p>
                          </div>
                          <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-white font-bold min-w-[80px] text-right">
                            {formatCurrency(cat.value)}원 ({percentage}%)
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <RecordList
            records={filteredRecords}
            onEdit={handleEditRecord}
            onDelete={handleDeleteRecord}
          />

          <RecurringExpense
            recurringExpenses={recurringExpenses}
            addRecurringExpense={addRecurringExpense}
            updateRecurringExpense={updateRecurringExpense}
            deleteRecurringExpense={deleteRecurringExpense}
            onApplyToRecords={(record) => {
              // 고정지출 적용시 현재 선택된 날짜로 설정
              addRecord({ ...record, date: selectedDate });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;



