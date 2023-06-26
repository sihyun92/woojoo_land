import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPayment {
  title?: string;
  quantity?: number;
  price?: number;
  discountRate?: number;
}

type TPaymentState = IPayment;

const initialState: TPaymentState = {
  title: "test",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    payment: (state, action: PayloadAction<IPayment>) => {
      const { title, quantity, price, discountRate } = action.payload;
      return {
        title,
        quantity,
        price,
        discountRate,
      };
    },
  },
});
export const { payment } = paymentSlice.actions;
export default paymentSlice.reducer;
