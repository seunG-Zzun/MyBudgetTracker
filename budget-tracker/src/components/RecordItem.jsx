import { formatDisplayDate } from '../utils/formatDate';
import { formatCurrency } from '../utils/calculateSummary';

const RecordItem = ({ record, onEdit, onDelete }) => {
  const isExpense = record.type === 'expense';
  
  return (
    <tr className="border-b border-white/10 hover:bg-white/5 transition-all">
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isExpense 
            ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
            : 'bg-green-500/20 text-green-300 border border-green-500/30'
        }`}>
          {isExpense ? '💸 지출' : '💰 수입'}
        </span>
      </td>
      <td className="px-6 py-4 font-medium text-white">{record.category}</td>
      <td className={`px-6 py-4 font-bold text-lg ${
        isExpense ? 'text-red-400' : 'text-green-400'
      }`}>
        {isExpense ? '-' : '+'}{formatCurrency(record.amount)}원
      </td>
      <td className="px-6 py-4 text-gray-300">{formatDisplayDate(record.date)}</td>
      <td className="px-6 py-4 text-gray-400">{record.memo || '-'}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(record)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-semibold"
          >
            ✏️ 수정
          </button>
          <button
            onClick={() => onDelete(record.id)}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all text-sm font-semibold"
          >
            🗑️ 삭제
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RecordItem;

