import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { formatAmount, parseAmount } from '../utils/formatAmount';
import { formatDate } from '../utils/formatDate';

const RecurringExpense = ({ 
  recurringExpenses, 
  addRecurringExpense, 
  updateRecurringExpense, 
  deleteRecurringExpense,
  onApplyToRecords 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(recurringExpenses.length > 0);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    memo: ''
  });

  const categories = [
    '주거비', '통신비', '보험료', '구독서비스', '저축', '기타'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount) {
      alert('카테고리와 금액을 입력해주세요.');
      return;
    }

    const expense = {
      id: editingExpense?.id || uuidv4(),
      category: formData.category,
      amount: Number(parseAmount(formData.amount)),
      memo: formData.memo
    };

    if (editingExpense) {
      updateRecurringExpense(expense.id, expense);
    } else {
      addRecurringExpense(expense);
    }

    setFormData({ category: '', amount: '', memo: '' });
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      const formattedValue = formatAmount(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setFormData({
      category: expense.category,
      amount: String(expense.amount),
      memo: expense.memo || ''
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({ category: '', amount: '', memo: '' });
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleApply = (expense) => {
    const today = new Date();
    const record = {
      id: uuidv4(),
      type: 'expense',
      category: expense.category,
      amount: expense.amount,
      date: formatDate(today),
      memo: expense.memo || ''
    };
    onApplyToRecords(record);
  };

  const handleApplyAll = () => {
    const today = new Date();
    recurringExpenses.forEach(expense => {
      const record = {
        id: uuidv4(),
        type: 'expense',
        category: expense.category,
        amount: expense.amount,
        date: formatDate(today),
        memo: expense.memo || ''
      };
      onApplyToRecords(record);
    });
  };

  return (
    <div className="glass-card mb-8 overflow-hidden">
      {/* Header - Always Visible */}
      <div 
        className="p-6 cursor-pointer hover:bg-white/5 transition-all"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">
              고정지출
            </h2>
            <span className="text-gray-400">
              {recurringExpenses.length > 0 && `(${recurringExpenses.length}개)`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isExpanded) {
                  setIsExpanded(true);
                }
                setShowForm(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-semibold text-sm glow-orange"
            >
              + 추가
            </button>
            <span className="text-2xl text-gray-400 transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Collapsible Content */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 space-y-6">

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 pb-6 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">카테고리</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
                required
              >
                <option value="" className="bg-navy-800">선택하세요</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-navy-800">{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">금액</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
                placeholder="금액을 입력하세요"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">메모</label>
              <input
                type="text"
                name="memo"
                value={formData.memo}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
                placeholder="메모 (선택사항)"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all font-semibold"
            >
              {editingExpense ? '수정' : '추가'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 transition-all font-semibold"
            >
              취소
            </button>
          </div>
        </form>
      )}

      {recurringExpenses.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">고정지출 목록</h3>
            {recurringExpenses.length > 1 && (
              <button
                onClick={handleApplyAll}
                className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm font-semibold"
              >
                모든 항목 적용 📅
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recurringExpenses.map(expense => (
              <div key={expense.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-bold text-lg">{expense.category}</p>
                    {expense.memo && (
                      <p className="text-gray-400 text-sm mt-1">{expense.memo}</p>
                    )}
                  </div>
                  <p className="text-orange-400 font-bold text-xl">
                    {formatAmount(String(expense.amount))}원
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApply(expense)}
                    className="flex-1 px-3 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm font-semibold"
                  >
                    적용
                  </button>
                  <button
                    onClick={() => handleEdit(expense)}
                    className="px-3 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-all text-sm"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('고정지출을 삭제하시겠습니까?')) {
                        deleteRecurringExpense(expense.id);
                      }
                    }}
                    className="px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {recurringExpenses.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl mb-2">등록된 고정지출이 없습니다</p>
          <p className="text-sm">위 버튼을 눌러 고정지출을 추가하세요</p>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default RecurringExpense;

