import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  discountRate: number;
}

type TCartState = ICartItem[];

const initialState: TCartState = [];

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    setQuantity: (state, action: PayloadAction<ICartItem>) => {
      const { title, quantity, price, discountRate, productId } =
        action.payload;
      // 기존의 아이템을 찾아 인덱스를 구함
      const itemIdx = state.findIndex((item) => item.title === title);

      // 존재한다면,
      if (itemIdx !== -1) {
        // 기존의 아이템을 삭제
        state.splice(itemIdx, 1);
      }

      // (수정된 수량을 가진) 새로운 아이템을 추가
      state.push({
        productId,
        title,
        quantity,
        price,
        discountRate,
      });
    },
  },
});

export const { setQuantity } = cartSlice.actions;
export default cartSlice.reducer;
