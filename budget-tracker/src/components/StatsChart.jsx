import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMonthlySummary, getCategorySummary, formatCurrency } from '../utils/calculateSummary';
import { getCurrentMonth } from '../utils/formatDate';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const StatsChart = ({ records }) => {
  const currentMonth = getCurrentMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.month);
  const [selectedYear, setSelectedYear] = useState(currentMonth.year);

  const summary = getMonthlySummary(records, selectedYear, selectedMonth);
  const categoryData = getCategorySummary(records, selectedYear, selectedMonth);

  // 수입/지출 데이터와 순수익 데이터를 분리
  const incomeExpenseData = [
    { name: '수입', amount: summary.income },
    { name: '지출', amount: summary.expense }
  ];
  
  const netProfit = summary.income - summary.expense;

  const generateMonthOptions = () => {
    const options = [];
    for (let i = 0; i < 12; i++) {
      options.push(
        <option key={i} value={i}>
          {i + 1}월
        </option>
      );
    }
    return options;
  };

  const generateYearOptions = () => {
    const options = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear; i++) {
      options.push(
        <option key={i} value={i}>
          {i}년
        </option>
      );
    }
    return options;
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📊</span>
          <h2 className="text-3xl font-bold text-white">월별 통계</h2>
        </div>
        
        <div className="flex gap-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">연도</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
            >
              {generateYearOptions()}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">월</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
            >
              {generateMonthOptions()}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 bg-green-500/10 border-green-500/30 glow-pink">
            <p className="text-sm text-gray-300 mb-2">💰 총 수입</p>
            <p className="text-3xl font-bold text-green-400">{formatCurrency(summary.income)}원</p>
          </div>
          <div className="glass-card p-6 bg-red-500/10 border-red-500/30 glow-pink">
            <p className="text-sm text-gray-300 mb-2">💸 총 지출</p>
            <p className="text-3xl font-bold text-red-400">{formatCurrency(summary.expense)}원</p>
          </div>
          <div className={`glass-card p-6 ${summary.income - summary.expense >= 0 ? 'bg-blue-500/10 border-blue-500/30' : 'bg-orange-500/10 border-orange-500/30'} glow-pink`}>
            <p className="text-sm text-gray-300 mb-2">📈 순수익</p>
            <p className={`text-3xl font-bold ${summary.income - summary.expense >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
              {formatCurrency(summary.income - summary.expense)}원
            </p>
          </div>
        </div>
      </div>

      {/* 수입/지출 막대그래프 */}
      <div className="glass-card p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">📊</span>
          수입/지출 비교
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeExpenseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="name" stroke="#ffffff40" />
            <YAxis stroke="#ffffff40" />
              <Tooltip 
                formatter={(value) => formatCurrency(value) + '원'} 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 46, 0.95)', 
                  border: '2px solid rgba(255, 112, 57, 0.6)', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                  padding: '12px 16px',
                  color: '#ffffff'
                }}
                labelStyle={{ 
                  color: '#ff7039', 
                  fontWeight: 'bold',
                  fontSize: '14px',
                  marginBottom: '4px'
                }}
                itemStyle={{ color: '#ffffff' }}
              />
            <Legend />
            <Bar dataKey="amount" fill="#ff7039" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 순수익 표시 */}
      <div className="glass-card p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">📈</span>
          순수익 분석
        </h3>
        <div className="bg-white/5 rounded-2xl p-8">
          <div className="text-center mb-6">
            <p className={`text-5xl font-bold mb-2 ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {netProfit >= 0 ? '📈' : '📉'} {formatCurrency(Math.abs(netProfit))}원
            </p>
            <p className="text-gray-300 text-xl">
              {netProfit >= 0 ? '이익 발생' : '손실 발생'}
            </p>
          </div>
          
          {/* 게이지 바 */}
          <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                netProfit >= 0 ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ 
                width: summary.income > 0 
                  ? `${Math.min(100, Math.abs(netProfit) / summary.income * 100)}%` 
                  : '0%' 
              }}
            ></div>
          </div>
          
          {/* 금액 비교 */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">수입</p>
              <p className="text-green-400 text-2xl font-bold">{formatCurrency(summary.income)}원</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">지출</p>
              <p className="text-red-400 text-2xl font-bold">{formatCurrency(summary.expense)}원</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">비율</p>
              <p className="text-white text-2xl font-bold">
                {summary.income > 0 
                  ? `${Math.round((summary.expense / summary.income) * 100)}%`
                  : '-'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 카테고리별 지출 */}
      <div className="glass-card p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🏷️</span>
          카테고리별 지출
        </h3>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatCurrency(value) + '원'} 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 46, 0.95)', 
                  border: '2px solid rgba(255, 112, 57, 0.6)', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                  padding: '12px 16px',
                  color: '#ffffff'
                }}
                labelStyle={{ 
                  color: '#ff7039', 
                  fontWeight: 'bold',
                  fontSize: '14px',
                  marginBottom: '4px'
                }}
                itemStyle={{ color: '#ffffff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-gray-400">
            <p>해당 월의 지출 데이터가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsChart;



