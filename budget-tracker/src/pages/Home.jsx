import { useState, useMemo } from 'react';
import RecordForm from '../components/RecordForm';
import RecordList from '../components/RecordList';
import FilterBar from '../components/FilterBar';
import dayjs from 'dayjs';

const Home = ({ records, addRecord, updateRecord, deleteRecord }) => {
  const [editingRecord, setEditingRecord] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    startDate: '',
    endDate: ''
  });

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      if (filters.type && record.type !== filters.type) return false;
      if (filters.category && record.category !== filters.category) return false;
      if (filters.startDate && dayjs(record.date).isBefore(dayjs(filters.startDate))) return false;
      if (filters.endDate && dayjs(record.date).isAfter(dayjs(filters.endDate))) return false;
      return true;
    }).sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
  }, [records, filters]);

  const handleAddRecord = (record) => {
    addRecord(record);
  };

  const handleUpdateRecord = (id, updatedRecord) => {
    updateRecord(id, updatedRecord);
    setEditingRecord(null);
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteRecord(id);
    }
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">나만의 가계부</h1>
          <p className="text-gray-600">수입과 지출을 기록하고 관리하세요</p>
        </div>

        <RecordForm
          onAddRecord={handleAddRecord}
          editingRecord={editingRecord}
          onUpdateRecord={handleUpdateRecord}
          onCancelEdit={handleCancelEdit}
        />

        <FilterBar onFilterChange={handleFilterChange} />

        <RecordList
          records={filteredRecords}
          onEdit={handleEditRecord}
          onDelete={handleDeleteRecord}
        />
      </div>
    </div>
  );
};

export default Home;



