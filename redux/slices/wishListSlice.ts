"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for a wishlist item
interface WishlistItem {
  id: number
  title: string
  salePrice: number
  imageUrl: string
}

// Define a type for the slice state
interface WishlistState {
  items: WishlistItem[]
}

// Initial state
const initialState: WishlistState = {
  items: [],
}

// Create the slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find(item => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearWishlist: (state) => {
      state.items = []
    },
  },
})

// Export actions and reducer
export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
