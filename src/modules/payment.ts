import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPayment {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  discountRate: number;
}

type TPaymentState = IPayment[];

const initialState: TPaymentState = [];

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    payment: (state, action: PayloadAction<IPayment>) => {
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
export const { payment } = paymentSlice.actions;
export default paymentSlice.reducer;
