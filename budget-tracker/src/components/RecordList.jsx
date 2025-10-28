import RecordItem from './RecordItem';

const RecordList = ({ records, onEdit, onDelete }) => {
  if (records.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <p className="text-gray-400 text-xl">📊 등록된 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">📋</span>
          내역 목록
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">구분</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">카테고리</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">금액</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">날짜</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">메모</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">작업</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <RecordItem
                key={record.id}
                record={record}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordList;



