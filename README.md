# 🧾 **나만의 가계부 (My Budget Tracker)**

## 0. 실행 방법

> 제출 압축 파일을 해제하면 `MyBudgetTracker/budget-tracker` 디렉토리가 생성됩니다. 아래 명령은 **항상 이 폴더로 이동한 뒤** 실행하세요.

### 사전 준비

1. 필수: Node.js 18+
   - 버전 확인: `node -v`
   - 설치 필요 시: [https://nodejs.org](https://nodejs.org) (LTS 권장)

### 설치 및 실행

2. 의존성 설치
   - macOS / Linux
     ```bash
     cd budget-tracker
     npm install
     ```
   - Windows (PowerShell)
     ```powershell
     cd budget-tracker
     npm install
     ```
3. 개발 서버 실행
   - macOS / Linux
     ```bash
     npm run dev
     ```
   - Windows (PowerShell)
     ```powershell
     npm run dev
     ```
   - 브라우저에서 `http://localhost:5173` 접속
4. 프로덕션 빌드 & 프리뷰 (선택)
   - macOS / Linux
     ```bash
     npm run build
     npm run preview
     ```
   - Windows (PowerShell)
     ```powershell
     npm run build
     npm run preview
     ```

---

## 1. 프로젝트 개요

**프로젝트명:** 나만의 가계부 (My Budget Tracker)  
**목적:** 사용자가 개인의 수입과 지출을 손쉽게 기록하고, 다양한 뷰 모드로 소비 패턴을 시각적으로 확인할 수 있는 React 기반 가계부 웹앱  
**대상 사용자:** 가계부 작성을 필요로 하는 사용자
**개발 환경:** React 18 + Vite, localStorage, Recharts, dayjs, Tailwind CSS  
**UI/UX:** APPOLLY 스타일의 모던 다크 테마 적용  
**개발 범위:** 프론트엔드 설계 및 구현

---

## 2. 목표 및 기능 범위

###  **핵심 목표**
- CRUD 기반의 지출/수입 관리 기능 제공  
- 데이터 영속성(localStorage) 보장  
- 다양한 뷰 모드(일별/월별/연도별/범위) 지원  
- 실시간 통계 및 시각화  
- 고정지출 관리 기능  

### **구현 범위**
| 기능 | 설명 |
|------|------|
| 기록 추가 | 금액(자동 천단위), 카테고리, 날짜, 메모 입력 |
| 기록 조회 | 다양한 뷰 모드로 내역 조회 |
| 기록 수정/삭제 | 기존 내역 변경 및 삭제 |
| 데이터 저장 | localStorage에 영속 저장 |
| 뷰 모드 | 일별/월별/연도별/범위 선택 지원 |
| 실시간 요약 | 수입/지출/순계 카드, 카테고리별 분석 |
| 통계 시각화 | BarChart, PieChart로 데이터 시각화 |
| 고정지출 | 반복 지출 자동 등록 |
| 필터링 | 구분/카테고리별 조회 |
| 금액 포맷 | 자동 천단위 쉼표 처리 |

---

## 3. 기술 스택

| 항목 | 기술 |
|------|------|
| **Framework** | React 18 (Vite 기반) |
| **상태관리** | React Context + useReducer + 커스텀 훅 |
| **데이터 저장소** | localStorage (budgetRecords, recurringExpenses) |
| **시각화** | Recharts (BarChart, PieChart) |
| **날짜 처리** | dayjs |
| **스타일링** | Tailwind CSS + Glass-morphism |
| **아이콘** | Emoji based |
| **UUID** | uuid (v4) |

---

## 4. 데이터 구조

```ts
// Record Type
type Record = {
  id: string;              // uuid
  type: 'income' | 'expense';
  category: string;         // ex. 식비, 교통, 취미
  amount: number;
  date: string;             // YYYY-MM-DD
  memo?: string;
};
```

**저장 형식 (localStorage key):**
```json
{
  "budgetRecords": [
    {
      "id": "abc123",
      "type": "expense",
      "category": "식비",
      "amount": 12000,
      "date": "2025-10-25",
      "memo": "점심 식사"
    }
  ],
  "recurringExpenses": [
    {
      "id": "rec456",
      "category": "주거비",
      "amount": 500000,
      "memo": "월세"
    }
  ]
}
```

---

## 5. 주요 기능 명세

### 1) 지출/수입 등록
- Glass-morphism 폼 디자인
- 금액 입력 시 자동 천단위 쉼표 처리 (예: 100000 → 100,000)
- 카테고리 동적 표시 (수입/지출에 따라 옵션 변경)
- 폼 유효성 검사: 금액은 숫자, 카테고리는 필수
- 저장 후 리스트 및 localStorage 갱신

### 2) 다양한 뷰 모드로 기록 조회
- **일별 뷰**: 특정 날짜의 내역만 표시, 이전/다음 버튼으로 날짜 이동
- **월별 뷰**: 해당 월 전체 내역 표시, month input으로 선택
- **연도별 뷰**: 해당 연도 전체 내역 표시, year input으로 선택
- **날짜 선택**: 시작일~종료일로 기간 지정

### 3) 실시간 요약 대시보드
- 수입/지출/순계 카드 (3개)
- 카테고리별 지출 분석 (상위 5개)
- 진행률 바로 비율 시각화
- 내역이 있을 때만 표시

### 4) 고정지출 관리
- 반복되는 지출을 미리 등록
- 카테고리: 주거비, 통신비, 보험료, 구독서비스, 저축, 기타
- "적용" 버튼으로 해당 날짜에 내역 자동 추가
- "모든 항목 적용"으로 일괄 등록 가능
- 접었다 펼치는 UI로 공간 절약

### 5) 수정 & 삭제
- 각 항목 옆에 수정/삭제 버튼 표시
- 수정 시 기존 데이터 폼에 로드
- 삭제 시 확인 다이얼로그 표시

### 6) 데이터 영속성
- localStorage에 CRUD 동기화
- 고정지출도 별도 키로 저장
- 앱 로드 시 데이터 복원

### 7) 통계 시각화
- 월별 수입/지출 비교 (BarChart)
- 카테고리별 지출 비율 (PieChart)
- 순수익 분석 섹션 (게이지 바 + 상세 통계)
- 개선된 툴팁 스타일 (오렌지 테두리 + 그림자)

---

## 6. 통계 계산 로직 (예시)

```js
import dayjs from "dayjs";

export const getMonthlySummary = (records, year, month) => {
  const filtered = records.filter(
    r => dayjs(r.date).year() === year && dayjs(r.date).month() === month
  );
  const income = filtered
    .filter(r => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);
  const expense = filtered
    .filter(r => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);
  return { income, expense };
};
```

---

## 7. 페이지 및 컴포넌트 구조

```
src/
 ┣ components/
 ┃ ┣ dashboard/
 ┃ ┃ ┣ SummaryCards.jsx        # 수입/지출/순계 집계 카드
 ┃ ┃ ┗ CategorySummary.jsx     # 카테고리별 지출 진행률
 ┃ ┣ home/
 ┃ ┃ ┗ ViewModeControls.jsx    # 일/월/연/범위 뷰 전환 + 날짜 네비게이션
 ┃ ┣ FilterBar.jsx             # 구분/카테고리/기간 필터
 ┃ ┣ RecordForm.jsx            # 내역 추가/수정 폼
 ┃ ┣ RecordList.jsx            # 내역 목록 테이블
 ┃ ┣ RecordItem.jsx            # 단일 내역 행
 ┃ ┣ RecurringExpense.jsx      # 고정지출 관리
 ┃ ┗ StatsChart.jsx            # 통계 차트 (Bar/Pie)
 ┣ context/
 ┃ ┗ BudgetContext.jsx         # BudgetProvider + useBudget 훅
 ┣ hooks/
 ┃ ┗ useBudgetStore.js         # useReducer 기반 전역 상태/로컬스토리지 동기화
 ┣ pages/
 ┃ ┣ Home.jsx                  # 홈 화면 (폼/필터/대시보드/목록/고정지출)
 ┃ ┗ Stats.jsx                 # 통계 화면
 ┣ utils/
 ┃ ┣ formatDate.js             # 날짜 포맷팅
 ┃ ┣ calculateSummary.js       # 통계 계산
 ┃ ┗ formatAmount.js           # 금액 천단위 쉼표 처리
 ┣ types/
 ┃ ┗ index.js                  # Categories 정의
 ┣ App.jsx                     # 네비게이션 + BudgetProvider 적용
 ┣ App.css
 ┣ index.css                   # Tailwind + Glass-morphism
 ┗ tailwind.config.js          # 커스텀 색상 (navy, orange, pink)
```

---

## 8. 상태 흐름 (State Flow)

| 이벤트 | 동작 | 결과 |
|--------|------|------|
| 앱 로드 | BudgetProvider → `useBudgetStore` | localStorage에서 records/recurringExpenses 복구 |
| 새 기록 추가 | RecordForm submit → `dispatch('ADD_RECORD')` | Context 상태 갱신 + localStorage 동기화 |
| 내역 수정 | RecordForm 재제출 → `dispatch('UPDATE_RECORD')` | 대상 id 업데이트 + 저장 |
| 내역 삭제 | RecordItem 삭제 → `dispatch('DELETE_RECORD')` | 대상 id 제거 + 저장 |
| 고정지출 적용 | RecurringExpense → `dispatch('ADD_RECORD')` | 선택 날짜에 지출 생성 |
| 통계/필터 변경 | ViewModeControls/FilterBar 상태 변경 | 메모이제이션으로 파생 데이터 다시 계산 |

---

## 9. 예시 UI 플로우

```
[홈 화면]
 ┣ 📝 내역 추가 폼 (자동 천단위 포맷)
 ┣ 📅 날짜 네비게이션
      ┣ 일별/월별/연도별/범위 선택 버튼
      ┣ 전날/다음날 이동 (일별)
      ┣ 날짜 선택 input (월별/연도별)
      ┣ 시작일~종료일 (범위)
 ┣ 📊 요약 대시보드
      ┣ 수입/지출/순계 카드
      ┣ 카테고리별 지출 분석 (진행률 바)
 ┣ 📋 내역 목록 테이블
 ┣ 🔄 고정지출 섹션 (접었다 펼치기)
 ┗ 📊 통계 화면 버튼

[통계 화면]
 ┣ 📅 월 선택 (드롭다운)
 ┣ 📊 PieChart: 카테고리별 지출 비율
 ┣ 📉 BarChart: 수입/지출 비교
 ┗ 💰 순수익 분석
      ┣ 큰 금액 표시 (이익/손실)
      ┣ 게이지 바
      ┣ 수입/지출/비율 비교
```

## 10. 주요 UI/UX 특징

### 1. Glass-morphism 디자인
- 반투명 블러 효과의 카드 UI
- Dark Navy 배경 (#1a1a2e)
- 그리드 패턴 배경

### 2. 커스텀 색상 팔레트
- Navy 계열: Dark theme
- Orange 계열 (#ff7039): 주요 액션, 강조
- Pink 계열: 보조 액센트

### 3. 애니메이션
- 부드러운 전환 효과
- 상호작용 피드백
- 진행률 바 애니메이션

### 4. 반응형 디자인
- 모바일/태블릿/데스크톱 대응
- Tailwind CSS 유틸리티 클래스 활용
