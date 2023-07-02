import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBuyItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  discountRate: number;
}

type TBuyState = IBuyItem[];

const initialState: TBuyState = [];

const buyItemSlice = createSlice({
  name: "buyItem",
  initialState,
  reducers: {
    buyItem: (state, action: PayloadAction<IBuyItem>) => {
      const { title, quantity, price, discountRate, productId } =
        action.payload;
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
export const { buyItem } = buyItemSlice.actions;
export default buyItemSlice.reducer;
