import StatsChart from '../components/StatsChart';

const Stats = ({ records }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">월별 통계</h1>
          <p className="text-gray-600">소비 패턴을 분석하고 확인하세요</p>
        </div>

        <StatsChart records={records} />
      </div>
    </div>
  );
};

export default Stats;



