import StatsChart from '../components/StatsChart';

const Stats = ({ records }) => {
  return (
    <div className="relative py-8">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            소비 패턴을<br />똑똑하게 분석하세요
          </h1>
          <p className="text-xl text-gray-300 mt-6">한눈에 보는 나의 소비 리포트</p>
        </div>

        <StatsChart records={records} />
      </div>
    </div>
  );
};

export default Stats;



