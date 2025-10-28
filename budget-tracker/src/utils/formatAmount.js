// 천 단위 쉼표 형식으로 변환
export const formatAmount = (value) => {
  if (!value) return '';
  
  // 숫자가 아닌 문자 제거 (쉼표 제외)
  const numberValue = String(value).replace(/[^\d]/g, '');
  
  // 천 단위 쉼표 추가
  return numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 입력값을 숫자로 변환 (쉼표 제거)
export const parseAmount = (value) => {
  if (!value) return '';
  return String(value).replace(/,/g, '');
};

// 숫자를 천 단위 쉼표가 있는 문자열로 변환
export const numberWithCommas = (number) => {
  if (!number && number !== 0) return '';
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

