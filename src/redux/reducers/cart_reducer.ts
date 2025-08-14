import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import AppConstants from '@/src/constants/app_constants'

// Types
export interface CartProduct {
  id: number
  name: string
  image: string | null
  sell_price: number
  stock: number
  is_public: boolean
  status: string
}

export interface CartItem {
  id: number
  product_id: number
  quantity: number
  customer_id: number | null
  guest_cart_token: string | null
  product: CartProduct
  created_at: string
  updated_at: string
}

export interface CartState {
  items: CartItem[]
  total: number
  guest_cart_token: string | null
  loading: boolean
  error: string | null
  initialized: boolean
}

// API Response types
interface CartResponse {
  data: CartItem[]
  guest_cart_token: string | null
  total: number
}

interface AddToCartPayload {
  product_id: number
  quantity: number
}

interface UpdateCartPayload {
  cartItemId: number
  quantity: number
}

// Generate unique guest cart token
const generateGuestToken = (): string => {
  return 'guest_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}

// Async thunks
export const fetchCart = createAsyncThunk<
  CartResponse,
  void,
  { state: RootState }
>('cart/fetchCart', async (_, { getState, rejectWithValue }) => {
  try {
    const { cart } = getState()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    if (cart.guest_cart_token) {
      headers['X-Cart-Token'] = cart.guest_cart_token
    }

    const response = await fetch(`${AppConstants.api_url}/cart`, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new Error('Failed to fetch cart')
    }

    const data: CartResponse = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
  }
})

export const addToCart = createAsyncThunk<
  CartResponse,
  AddToCartPayload,
  { state: RootState }
>('cart/addToCart', async (payload, { getState, dispatch, rejectWithValue }) => {
  try {
    const { cart } = getState()
    let currentToken = cart.guest_cart_token

    // Generate token if not exists
    if (!currentToken) {
      currentToken = generateGuestToken()
      dispatch(setGuestCartToken(currentToken))
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    if (currentToken) {
      headers['X-Cart-Token'] = currentToken
    }

    const response = await fetch(`${AppConstants.api_url}/cart`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to add item to cart')
    }

    const data: CartResponse = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
  }
})

export const updateCartItem = createAsyncThunk<
  CartResponse,
  UpdateCartPayload,
  { state: RootState }
>('cart/updateCartItem', async ({ cartItemId, quantity }, { getState, rejectWithValue }) => {
  try {
    const { cart } = getState()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    if (cart.guest_cart_token) {
      headers['X-Cart-Token'] = cart.guest_cart_token
    }

    const response = await fetch(`${AppConstants.api_url}/cart/items/${cartItemId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ quantity }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to update cart item')
    }

    const data: CartResponse = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
  }
})

export const removeFromCart = createAsyncThunk<
  CartResponse,
  number,
  { state: RootState }
>('cart/removeFromCart', async (cartItemId, { getState, rejectWithValue }) => {
  try {
    const { cart } = getState()
    const headers: Record<string, string> = {}
    
    if (cart.guest_cart_token) {
      headers['X-Cart-Token'] = cart.guest_cart_token
    }

    const response = await fetch(`${AppConstants.api_url}/cart/items/${cartItemId}`, {
      method: 'DELETE',
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to remove item from cart')
    }

    const data: CartResponse = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
  }
})

export const clearCart = createAsyncThunk<
  CartResponse,
  void,
  { state: RootState }
>('cart/clearCart', async (_, { getState, rejectWithValue }) => {
  try {
    const { cart } = getState()
    const headers: Record<string, string> = {}
    
    if (cart.guest_cart_token) {
      headers['X-Cart-Token'] = cart.guest_cart_token
    }

    const response = await fetch(`${AppConstants.api_url}/cart/clear`, {
      method: 'POST',
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to clear cart')
    }

    const data: CartResponse = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
  }
})

export const mergeGuestCart = createAsyncThunk<
  CartResponse,
  void,
  { state: RootState }
>('cart/mergeGuestCart', async (_, { getState, rejectWithValue }) => {
  try {
    const { cart } = getState()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    if (cart.guest_cart_token) {
      headers['X-Cart-Token'] = cart.guest_cart_token
    }

    const response = await fetch(`${AppConstants.api_url}/cart/merge`, {
      method: 'POST',
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to merge cart')
    }

    const data: CartResponse = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
  }
})

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
  guest_cart_token: null,
  loading: false,
  error: null,
  initialized: false,
}

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setGuestCartToken: (state, action: PayloadAction<string>) => {
      state.guest_cart_token = action.payload
    },
    clearGuestCartToken: (state) => {
      state.guest_cart_token = null
    },
    generateGuestCartToken: (state) => {
      if (!state.guest_cart_token) {
        state.guest_cart_token = generateGuestToken()
      }
    },
    clearError: (state) => {
      state.error = null
    },
    resetCart: (state) => {
      state.items = []
      state.total = 0
      state.error = null
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    // Fetch cart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.total = action.payload.total
        state.initialized = true
        if (action.payload.guest_cart_token) {
          state.guest_cart_token = action.payload.guest_cart_token
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.initialized = true
      })

    // Add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.total = action.payload.total
        if (action.payload.guest_cart_token) {
          state.guest_cart_token = action.payload.guest_cart_token
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update cart item
    builder
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.total = action.payload.total
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Remove from cart
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.total = action.payload.total
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Clear cart
    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.total = action.payload.total
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Merge guest cart
    builder
      .addCase(mergeGuestCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(mergeGuestCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.total = action.payload.total
        // Clear guest token after successful merge
        state.guest_cart_token = null
      })
      .addCase(mergeGuestCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const {
  setGuestCartToken,
  clearGuestCartToken,
  generateGuestCartToken,
  clearError,
  resetCart,
} = cartSlice.actions

// Selectors
export const selectCart = (state: RootState) => state.cart
export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartTotal = (state: RootState) => state.cart.total
export const selectCartItemsCount = (state: RootState) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartLoading = (state: RootState) => state.cart.loading
export const selectCartError = (state: RootState) => state.cart.error
export const selectGuestCartToken = (state: RootState) => state.cart.guest_cart_token
export const selectCartInitialized = (state: RootState) => state.cart.initialized

export default cartSlice.reducer
