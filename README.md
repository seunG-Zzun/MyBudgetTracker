# 🧾 **나만의 가계부 (Personal Budget Tracker) — Product Requirements Document (PRD)**

## 📌 1. 프로젝트 개요

**프로젝트명:** 나만의 가계부 (My Budget Tracker)  
**목적:** 사용자가 개인의 수입과 지출을 손쉽게 기록하고, 월별 통계를 통해 소비 패턴을 시각적으로 확인할 수 있는 React 기반 가계부 웹앱을 개발한다.  
**대상 사용자:** 개인 사용자, 대학생  
**개발 환경:** React + Vite, localStorage, Recharts, dayjs  
**개발자 역할:** 프론트엔드 설계 및 구현 (전공자 수준 코드 구조 및 상태관리 포함)  

---

## 🎯 2. 목표 및 기능 범위

### ✅ **핵심 목표**
- CRUD 기반의 지출/수입 관리 기능 제공  
- 데이터 영속성(localStorage) 보장  
- 월별 소비 통계 시각화  

### 📋 **구현 범위**
| 기능 | 설명 | 비고 |
|------|------|------|
| 기록 추가 | 금액, 카테고리, 날짜, 메모 입력 | 필수 |
| 기록 조회 | 전체 기록 리스트 표시 | 필수 |
| 기록 수정/삭제 | 기존 내역 변경 및 삭제 | 필수 |
| 데이터 저장 | localStorage에 영속 저장 | 필수 |
| 월별 통계 | 카테고리별 / 총액 그래프 표시 | 추가 기능 |
| 필터링 | 날짜/카테고리별 조회 | 선택 |

---

## 🧱 3. 기술 스택

| 항목 | 기술 |
|------|------|
| **Framework** | React 18 (Vite 기반) |
| **상태관리** | useState / useContext |
| **데이터 저장소** | localStorage |
| **시각화** | Recharts |
| **날짜 처리** | dayjs |
| **스타일링** | Tailwind CSS or CSS Modules |

---

## 🗂️ 4. 데이터 구조

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
  ]
}
```

---

## 🧩 5. 주요 기능 명세

### 📥 1) 지출/수입 등록
- 사용자는 금액, 카테고리, 날짜, 메모를 입력
- 폼 유효성 검사: 금액은 숫자, 카테고리는 필수
- 저장 후 리스트 및 localStorage 갱신

### 📋 2) 기록 목록 조회
- 테이블 또는 카드 형태 UI
- 날짜 순, 금액 순 정렬
- 카테고리/기간 필터링 지원

### ✏️ 3) 수정 & 삭제
- 각 항목 옆에 수정/삭제 버튼 표시
- 수정 시 기존 데이터 폼에 로드

### 💾 4) 데이터 영속성
- localStorage에 CRUD 동기화
- 앱 로드 시 데이터 복원

### 📈 5) 월별 통계
- 월별 총 수입/지출 금액 계산
- Recharts로 시각화 (BarChart, PieChart)
- 선택한 월 기준으로 필터링

---

## 📊 6. 통계 계산 로직 (예시)

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

## 🧠 7. 페이지 및 컴포넌트 구조

```
src/
 ┣ components/
 ┃ ┣ RecordForm.jsx       # 수입/지출 입력 폼
 ┃ ┣ RecordList.jsx       # 내역 목록 테이블
 ┃ ┣ RecordItem.jsx       # 단일 내역 컴포넌트
 ┃ ┣ FilterBar.jsx        # 카테고리/날짜 필터
 ┃ ┗ StatsChart.jsx       # 월별 통계 시각화
 ┣ pages/
 ┃ ┣ Home.jsx             # 메인 화면 (기록 리스트)
 ┃ ┗ Stats.jsx            # 통계 화면
 ┣ hooks/
 ┃ ┗ useLocalStorage.js   # 데이터 저장 커스텀 훅
 ┣ utils/
 ┃ ┣ formatDate.js
 ┃ ┗ calculateSummary.js
 ┣ App.jsx
 ┣ index.jsx
 ┗ styles/
    ┗ global.css
```

---

## 🔄 8. 상태 흐름 (State Flow)

| 이벤트 | 동작 | 결과 |
|--------|------|------|
| 새 기록 추가 | form 입력 → onSubmit | `records` 상태 갱신 + localStorage 저장 |
| 내역 삭제 | delete 버튼 클릭 | 해당 id 필터링 후 저장 |
| 수정 완료 | form 재제출 | 기존 id 갱신 |
| 월별 통계 요청 | month select 변경 | 통계 데이터 재계산 |

---

## 🧮 9. 예시 UI 플로우

```
[홈 화면]
 ┣ ➕ 내역 추가 버튼
 ┣ 🗂️ 전체 내역 목록
 ┣ 🔍 필터바 (카테고리, 날짜)
 ┗ 📈 월별 통계 보기 버튼

[통계 화면]
 ┣ 📅 월 선택 (드롭다운)
 ┣ 📊 PieChart: 카테고리별 지출 비율
 ┗ 📉 BarChart: 수입/지출 비교
```

---

## ✅ 10. 성공 기준 (Acceptance Criteria)

| 항목 | 기준 |
|------|------|
| CRUD 기능 | 모든 추가, 수정, 삭제 동작 정상 |
| 데이터 유지 | 새로고침 후 데이터 유지 |
| 통계 표시 | 월별 차트 정상 출력 |
| 반응형 | 모바일/PC 대응 |
| 코드 품질 | 모듈화, 의미 있는 커밋 단위 |

---

## 🚀 11. 향후 확장 계획 (Optional)

- Firebase Auth 연동 → 사용자별 가계부 관리  
- 예산 목표 설정 및 초과 시 알림  
- 소비 패턴 요약 (AI API 연동)  

---

## 📅 12. 일정 계획 (Draft)

| 주차 | 작업 항목 | 산출물 |
|------|------------|---------|
| 1주차 | 프로젝트 세팅, 기본 UI 구현 | 기본 폴더 구조, 초기 화면 |
| 2주차 | CRUD 기능, localStorage 연동 | 입력/조회/삭제/수정 완성 |
| 3주차 | 월별 통계 기능 및 스타일링 | 차트 화면, 최종 리팩토링 |
