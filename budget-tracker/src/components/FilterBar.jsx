import { Categories } from '../types';

const defaultFilters = {
  type: '',
  category: '',
  startDate: '',
  endDate: ''
};

const FilterBar = ({
  filters,
  onFilterChange,
  availableCategories = [],
  showDateRange = false
}) => {
  const categories =
    availableCategories.length > 0
      ? availableCategories
      : Array.from(new Set(Object.values(Categories).flat()));

  const handleChange = (name, value) => {
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  const handleReset = () => {
    onFilterChange({ ...defaultFilters });
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
            value={filters.type}
            onChange={(event) => handleChange('type', event.target.value)}
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
            value={filters.category}
            onChange={(event) => handleChange('category', event.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
          >
            <option value="" className="bg-navy-800">전체</option>
            {categories.map(cat => (
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
            value={filters.startDate}
            onChange={(event) => handleChange('startDate', event.target.value)}
            disabled={!showDateRange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm disabled:opacity-40"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            종료일
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(event) => handleChange('endDate', event.target.value)}
            disabled={!showDateRange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm disabled:opacity-40"
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

