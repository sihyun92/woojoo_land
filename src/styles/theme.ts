import { DefaultTheme } from "styled-components";

//상세 디자인 스타일은 우주부동산 피그마에 정리되어 있습니다.
export const theme: DefaultTheme = {
  colors: {
    orange: {
      main: "#FF6214", //프로젝트 메인 컬러 또는 버튼 컬러 그리고 수정, 장바구니, 달력, 새로고침 버튼 hover 사용 컬러
      hover: "#E14400", //기본 버튼 호버 컬러
      pressed: "#502612", //header의 태그 버튼이 선택된 상태의 컬러
      linear: "#FF9C40", //header 배경색의 그라데이션에 사용되는 밝은 오렌디 컬러
    },
    purple: "#922bff", //야간 모드 개발에 사용되는 컬러 추후 변경 예정
    black: "#000", //기본 블랙
    white: "#fff", //기본 화이트
    gray: [
      "#858585", //[0] 현재 사용되지 않음
      "#454545", //[1] 현재 사용되지 않음
      "#f4f4f4", //[2] input 비활성 텍스트에 사용
      "#d0d0d0", //[3] input 박스 배경에 사용
      "#f0f0f0", //[4] 현재 사용되지 않음
      "#818181", //[5] 본문 텍스트에 사용
      "#bbbbbb", //[6] header input border
      "#ececec", //[7] 리스트 아이템 테두리 색상
    ],
    pink: "#FF2626", //좋아요 하트 컬러
  },
};
