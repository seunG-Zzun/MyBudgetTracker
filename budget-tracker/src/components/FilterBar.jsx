import { useState } from 'react';
import { Categories } from '../types';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      type: '',
      category: '',
      startDate: '',
      endDate: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🔍</span>
        <h3 className="text-xl font-bold text-white">필터</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            구분
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
          >
            <option value="" className="bg-navy-800">전체</option>
            <option value="income" className="bg-navy-800">수입</option>
            <option value="expense" className="bg-navy-800">지출</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            카테고리
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
          >
            <option value="" className="bg-navy-800">전체</option>
            {Object.values(Categories).flat().filter((cat, index, self) => self.indexOf(cat) === index).map(cat => (
              <option key={cat} value={cat} className="bg-navy-800">{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            시작일
          </label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            종료일
          </label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 transition-all font-semibold border border-white/20"
        >
          🔄 필터 초기화
        </button>
      </div>
    </div>
  );
};

export default FilterBar;



