import { formatCurrency } from '../../utils/calculateSummary';

const CategorySummary = ({ categories, totalExpense }) => {
  if (!categories.length) {
    return null;
  }

  return (
    <div className="glass-card p-6 mt-6">
      <p className="text-sm text-gray-400 mb-3">카테고리별 지출</p>
      <div className="space-y-2">
        {categories.map((category) => {
          const percentage =
            totalExpense > 0 ? ((category.value / totalExpense) * 100).toFixed(1) : 0;
          return (
            <div key={category.name} className="flex items-center gap-3">
              <div className="flex items-center gap-2 min-w-[80px]">
                <span className="text-orange-400">●</span>
                <p className="text-sm text-gray-300">{category.name}</p>
              </div>
              <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-white font-bold min-w-[110px] text-right">
                {formatCurrency(category.value)}원 ({percentage}%)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySummary;

