// 수정 중에 있습니다.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 인터페이스 정의
interface CartState {
  items: string[];
  totalAmount: number;
}

// 초기 State 정의
const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

// createSlice({슬라이스 이름, 초기 상태, 액션})
const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // 상품 ID를 비교하여 상품 추가
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },

    // 상품 ID를 비교하여 상품 제거
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },

    // 장바구니 초기화
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

// 액션 생성자 내보내기
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// 리듀서 내보내기
export default cartSlice.reducer;
