import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Categories } from '../types';
import { formatDate } from '../utils/formatDate';
import { formatAmount, parseAmount } from '../utils/formatAmount';

const RecordForm = ({ onAddRecord, editingRecord, onUpdateRecord, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    type: editingRecord?.type || 'expense',
    category: editingRecord?.category || '',
    amount: editingRecord?.amount ? formatAmount(editingRecord.amount) : '',
    date: editingRecord?.date || formatDate(new Date()),
    memo: editingRecord?.memo || ''
  });

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        type: editingRecord.type,
        category: editingRecord.category,
        amount: formatAmount(editingRecord.amount),
        date: editingRecord.date,
        memo: editingRecord.memo || ''
      });
    } else {
      setFormData({
        type: 'expense',
        category: '',
        amount: '',
        date: formatDate(new Date()),
        memo: ''
      });
    }
  }, [editingRecord]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount) {
      alert('카테고리와 금액을 입력해주세요.');
      return;
    }

    const record = {
      id: editingRecord?.id || uuidv4(),
      type: formData.type,
      category: formData.category,
      amount: Number(parseAmount(formData.amount)), // 쉼표 제거 후 숫자로 변환
      date: formData.date,
      memo: formData.memo
    };

    if (editingRecord) {
      onUpdateRecord(record.id, record);
    } else {
      onAddRecord(record);
    }

    // Reset form
    setFormData({
      type: 'expense',
      category: '',
      amount: '',
      date: formatDate(new Date()),
      memo: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'type') {
      setFormData((prev) => ({
        ...prev,
        type: value,
        category: ''
      }));
      return;
    }

    // 금액 필드의 경우 천 단위 쉼표 자동 추가
    if (name === 'amount') {
      const formattedValue = formatAmount(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
        <span className="text-4xl">📝</span>
        {editingRecord ? '내역 수정' : '내역 추가'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            구분
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
          >
            <option value="expense" className="bg-navy-800">지출</option>
            <option value="income" className="bg-navy-800">수입</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            카테고리
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
            required
          >
            <option value="" className="bg-navy-800">선택하세요</option>
            {Categories[formData.type].map(cat => (
              <option key={cat} value={cat} className="bg-navy-800">{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            금액
          </label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="금액을 입력하세요"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            날짜
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            메모
          </label>
          <input
            type="text"
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
            placeholder="메모를 입력하세요 (선택사항)"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all font-semibold glow-orange"
        >
          {editingRecord ? '수정하기' : '추가하기'}
        </button>
        {editingRecord && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-8 py-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 transition-all font-semibold border border-white/20"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
};

export default RecordForm;
