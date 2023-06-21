import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TCartState = {
  [title: string]: number;
};

const initialState: TCartState = {};

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
      state[title] = quantity * price;
    },
  },
});

export const { setQuantity } = cartSlice.actions;
export default cartSlice.reducer;
