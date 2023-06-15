// API에서 받아온 시간을 한국 시간으로 조정하고 원하는 포맷으로 수정
// 예) 2023-06-15T00:00:00.000Z -> 2023-06-15 00:00:00
const adjustDate = (date: string) => {
  const parsedTime = new Date(date);
  const adjustedTime = new Date(parsedTime.getTime() + 9 * 60 * 60 * 1000);
  return adjustedTime
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d+Z$/, "");
};

// 달러 표기 변환
// 예) 3000000 -> $3,000,000
const formatDollar = (dollar: number) => {
  const formattedDollar = "$" + dollar.toLocaleString("en-US");
  return formattedDollar;
};

export { adjustDate, formatDollar };
