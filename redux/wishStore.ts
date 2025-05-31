"use client"
import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './slices/wishListSlice'

export const store = configureStore({
  reducer: {
    cart: wishlistReducer,
    wishlist: wishlistReducer, // <-- Add wishlist reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
