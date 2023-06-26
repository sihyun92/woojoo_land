import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartItem {
  title: string;
  quantity: number;
  price: number;
}

type TCartState = ICartItem[];

const initialState: TCartState = [];

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    setQuantity: (
      state,
      action: PayloadAction<{
        title: string;
        quantity: number;
        price: number;
      }>,
    ) => {
      const { title, quantity, price } = action.payload;
      state.push({
        title: action.payload.title,
        quantity: action.payload.quantity,
        price: action.payload.price,
      });
    },
  },
});

export const { setQuantity } = cartSlice.actions;
export default cartSlice.reducer;
