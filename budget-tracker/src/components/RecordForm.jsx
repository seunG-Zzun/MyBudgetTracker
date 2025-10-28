import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Categories } from '../types';
import { formatDate } from '../utils/formatDate';

const RecordForm = ({ onAddRecord, editingRecord, onUpdateRecord, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    type: editingRecord?.type || 'expense',
    category: editingRecord?.category || '',
    amount: editingRecord?.amount || '',
    date: editingRecord?.date || formatDate(new Date()),
    memo: editingRecord?.memo || ''
  });

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
      amount: Number(formData.amount),
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingRecord ? '내역 수정' : '새 내역 추가'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            구분
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="expense">지출</option>
            <option value="income">수입</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">선택하세요</option>
            {Categories[formData.type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            금액
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="금액을 입력하세요"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            날짜
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            메모
          </label>
          <input
            type="text"
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="메모를 입력하세요 (선택사항)"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {editingRecord ? '수정하기' : '추가하기'}
        </button>
        {editingRecord && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
};

export default RecordForm;

