import RecordItem from './RecordItem';

const RecordList = ({ records, onEdit, onDelete }) => {
  if (records.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-500 text-lg">등록된 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">구분</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">카테고리</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">금액</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">날짜</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">메모</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">작업</th>
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



