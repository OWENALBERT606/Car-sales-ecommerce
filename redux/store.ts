"use client"
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; // Import the cart slice

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Add the cart reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
