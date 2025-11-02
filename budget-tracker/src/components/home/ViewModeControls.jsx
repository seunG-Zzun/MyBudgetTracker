import dayjs from 'dayjs';

const ViewModeControls = ({
  viewMode,
  selectedDate,
  onViewModeChange,
  onSelectedDateChange,
  filters,
  onFiltersChange,
  recordCount
}) => {
  const isToday = dayjs(selectedDate).isSame(dayjs(), 'day');
  const isFuture = dayjs(selectedDate).isAfter(dayjs(), 'day');

  const displayText = () => {
    if (viewMode === 'day') {
      return isToday ? '오늘' : dayjs(selectedDate).format('YYYY년 M월 D일');
    }
    if (viewMode === 'month') {
      return dayjs(selectedDate).format('YYYY년 M월');
    }
    if (viewMode === 'year') {
      return dayjs(selectedDate).format('YYYY년');
    }
    if (filters.startDate && filters.endDate) {
      return `${dayjs(filters.startDate).format('YYYY.MM.DD')} ~ ${dayjs(filters.endDate).format(
        'YYYY.MM.DD'
      )}`;
    }
    if (filters.startDate) {
      return `${dayjs(filters.startDate).format('YYYY.MM.DD')} ~`;
    }
    return '범위 선택';
  };

  const handleModeChange = (mode) => {
    onViewModeChange(mode);
    if (mode !== 'range' && (filters.startDate || filters.endDate)) {
      onFiltersChange({ ...filters, startDate: '', endDate: '' });
    }
  };

  const goPreviousDay = () => {
    onSelectedDateChange(dayjs(selectedDate).subtract(1, 'day').format('YYYY-MM-DD'));
  };

  const goNextDay = () => {
    if (isFuture) {
      return;
    }
    onSelectedDateChange(dayjs(selectedDate).add(1, 'day').format('YYYY-MM-DD'));
  };

  const handleToday = () => {
    onSelectedDateChange(dayjs().format('YYYY-MM-DD'));
    onViewModeChange('day');
  };

  const handleDateInput = (value) => {
    onSelectedDateChange(value);
    onViewModeChange('day');
  };

  const handleMonthInput = (value) => {
    if (!value) return;
    onSelectedDateChange(`${value}-01`);
    onViewModeChange('month');
  };

  const handleYearInput = (value) => {
    if (!value) return;
    onSelectedDateChange(`${value}-01-01`);
    onViewModeChange('year');
  };

  const handleRangeChange = (name, value) => {
    onFiltersChange({ ...filters, [name]: value });
  };

  const modeButtonClass = (mode) =>
    `px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
      viewMode === mode ? 'bg-orange-500 text-white glow-orange' : 'bg-white/10 text-gray-300 hover:bg-white/20'
    }`;

  return (
    <div className="glass-card p-6">
      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => handleModeChange('day')} className={modeButtonClass('day')}>
          일별
        </button>
        <button onClick={() => handleModeChange('month')} className={modeButtonClass('month')}>
          월별
        </button>
        <button onClick={() => handleModeChange('year')} className={modeButtonClass('year')}>
          연도별
        </button>
        <button onClick={() => handleModeChange('range')} className={modeButtonClass('range')}>
          날짜 선택
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {viewMode === 'day' && (
            <>
              <button
                onClick={goPreviousDay}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white font-bold text-lg"
              >
                ◀
              </button>
              <div className="text-center">
                <button
                  onClick={handleToday}
                  className={`px-6 py-3 rounded-xl transition-all font-bold text-xl ${
                    isToday
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white glow-orange'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {displayText()}
                  {isToday && ' ✓'}
                </button>
              </div>
              <button
                onClick={goNextDay}
                disabled={isFuture}
                className={`px-4 py-2 rounded-xl transition-all text-white font-bold text-lg ${
                  isFuture ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                ▶
              </button>
            </>
          )}

          {viewMode === 'month' && (
            <div className="flex items-center gap-3">
              <input
                type="month"
                value={selectedDate.slice(0, 7)}
                onChange={(event) => handleMonthInput(event.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
              />
              <button
                onClick={handleToday}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-sm"
              >
                오늘
              </button>
            </div>
          )}

          {viewMode === 'year' && (
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={selectedDate.slice(0, 4)}
                onChange={(event) => handleYearInput(event.target.value)}
                className="px-4 py-3 w-32 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm"
                min="2000"
                max="2100"
              />
              <button
                onClick={handleToday}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-sm"
              >
                오늘
              </button>
            </div>
          )}

          {viewMode === 'range' && (
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={filters.startDate}
                onChange={(event) => handleRangeChange('startDate', event.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm text-sm"
              />
              <span className="text-gray-400 font-bold">~</span>
              <input
                type="date"
                value={filters.endDate}
                onChange={(event) => handleRangeChange('endDate', event.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm text-sm"
              />
            </div>
          )}
        </div>

        <div className="text-right">
          {viewMode === 'day' && (
            <>
              <p className="text-gray-400 text-sm">{dayjs(selectedDate).format('dddd')}</p>
              <div className="mt-2">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => handleDateInput(event.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all backdrop-blur-sm text-sm"
                />
              </div>
            </>
          )}

          {viewMode === 'month' && (
            <p className="text-gray-400 text-sm">{dayjs(selectedDate).format('MMMM')}</p>
          )}

          {viewMode === 'year' && (
            <p className="text-gray-400 text-sm">{recordCount}개 내역</p>
          )}

          {viewMode === 'range' && (
            <div>
              <p className="text-gray-400 text-sm">{displayText()}</p>
              <p className="text-gray-500 text-xs mt-1">{recordCount}개 내역</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewModeControls;
