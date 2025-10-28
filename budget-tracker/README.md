# 나만의 가계부 (My Budget Tracker)

개인의 수입과 지출을 손쉽게 기록하고, 월별 통계를 통해 소비 패턴을 시각적으로 확인할 수 있는 React 기반 가계부 웹앱입니다.

## 🚀 주요 기능

- ✅ **CRUD 기능**: 수입/지출 내역 추가, 조회, 수정, 삭제
- 💾 **데이터 영속성**: localStorage를 활용한 데이터 저장
- 📊 **월별 통계**: Recharts를 활용한 시각화
- 🔍 **필터링**: 날짜/카테고리별 조회 기능
- 📱 **반응형 디자인**: 모바일과 PC 모두 지원

## 🛠️ 기술 스택

- **Framework**: React 18 (Vite 기반)
- **상태관리**: useState, useContext
- **데이터 저장소**: localStorage
- **시각화**: Recharts
- **날짜 처리**: dayjs
- **스타일링**: Tailwind CSS

## 📦 설치 및 실행

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 확인하세요.

### 빌드
```bash
npm run build
```

## 📁 프로젝트 구조

```
src/
 ├── components/          # 재사용 가능한 컴포넌트
 │   ├── RecordForm.jsx   # 수입/지출 입력 폼
 │   ├── RecordList.jsx   # 내역 목록 테이블
 │   ├── RecordItem.jsx   # 단일 내역 컴포넌트
 │   ├── FilterBar.jsx    # 카테고리/날짜 필터
 │   └── StatsChart.jsx   # 월별 통계 시각화
 ├── pages/               # 페이지 컴포넌트
 │   ├── Home.jsx         # 메인 화면 (기록 리스트)
 │   └── Stats.jsx        # 통계 화면
 ├── hooks/               # 커스텀 훅
 │   └── useLocalStorage.js
 ├── utils/               # 유틸리티 함수
 │   ├── formatDate.js
 │   └── calculateSummary.js
 ├── types/               # 타입 정의
 │   └── index.js
 ├── App.jsx
 └── main.jsx
```

## 🎯 사용 방법

1. **가계부 화면**: 수입/지출 내역을 추가, 수정, 삭제할 수 있습니다.
2. **통계 화면**: 월별 수입/지출 비교와 카테고리별 지출 비율을 확인할 수 있습니다.
3. **필터링**: 날짜 범위와 카테고리로 내역을 필터링할 수 있습니다.

## 📝 데이터 구조

```typescript
type Record = {
  id: string;              // uuid
  type: 'income' | 'expense';
  category: string;         // ex. 식비, 교통, 취미
  amount: number;
  date: string;             // YYYY-MM-DD
  memo?: string;
};
```

## 🔮 향후 계획

- Firebase Auth 연동으로 사용자별 가계부 관리
- 예산 목표 설정 및 초과 시 알림
- 소비 패턴 요약 (AI API 연동)

## 📄 라이선스

MIT License
