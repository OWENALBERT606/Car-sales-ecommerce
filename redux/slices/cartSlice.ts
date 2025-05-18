"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for a cart item
interface CartItem {
  id: number;
  title: string;
  salePrice: number;
  qty: number;
  imageUrl:string
  
}

// Define a type for the slice state
interface CartState {
  items: CartItem[];
}

// Initial state
const initialState: CartState = {
  items: [],
};

// Create the slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.qty += action.payload.qty; // Update qty if item exists
      } else {
        state.items.push(action.payload); // Add new item
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload); // Remove item by id
      // localStorage.setItem("cart",JSON.stringify([...state]));

    },
    updateqty: (state, action: PayloadAction<{ id: number; qty: number }>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.qty = action.payload.qty; // Update the item qty
      }
    },
    clearCart: (state) => {
      state.items = []; // Clear the cart
    },
  },
});

// Export actions and reducer
export const { addItem, removeItem, updateqty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
