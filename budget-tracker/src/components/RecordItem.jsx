import { formatDisplayDate } from '../utils/formatDate';
import { formatCurrency } from '../utils/calculateSummary';

const RecordItem = ({ record, onEdit, onDelete }) => {
  const isExpense = record.type === 'expense';
  
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isExpense ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {isExpense ? '지출' : '수입'}
        </span>
      </td>
      <td className="px-4 py-3 font-medium">{record.category}</td>
      <td className={`px-4 py-3 font-semibold ${
        isExpense ? 'text-red-600' : 'text-green-600'
      }`}>
        {isExpense ? '-' : '+'}{formatCurrency(record.amount)}원
      </td>
      <td className="px-4 py-3 text-gray-600">{formatDisplayDate(record.date)}</td>
      <td className="px-4 py-3 text-gray-500">{record.memo || '-'}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(record)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
          >
            수정
          </button>
          <button
            onClick={() => onDelete(record.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
          >
            삭제
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RecordItem;

