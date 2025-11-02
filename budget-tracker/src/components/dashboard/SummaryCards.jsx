import { formatCurrency } from '../../utils/calculateSummary';

const SummaryCards = ({ summary }) => {
  const netIsPositive = summary.total >= 0;

  return (
    <div className="glass-card p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📈</span>
            <p className="text-sm text-gray-300 font-semibold">수입</p>
          </div>
          <p className="text-2xl font-bold text-green-400">
            {formatCurrency(summary.income)}원
          </p>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💸</span>
            <p className="text-sm text-gray-300 font-semibold">지출</p>
          </div>
          <p className="text-2xl font-bold text-red-400">
            {formatCurrency(summary.expense)}원
          </p>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            netIsPositive
              ? 'bg-blue-500/10 border-blue-500/30'
              : 'bg-orange-500/10 border-orange-500/30'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{netIsPositive ? '💹' : '⚠️'}</span>
            <p className="text-sm text-gray-300 font-semibold">순계</p>
          </div>
          <p
            className={`text-2xl font-bold ${
              netIsPositive ? 'text-blue-400' : 'text-orange-400'
            }`}
          >
            {formatCurrency(summary.total)}원
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;

