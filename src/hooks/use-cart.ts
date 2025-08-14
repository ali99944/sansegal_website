import { NotificationContext } from '@/src/providers/notification-provider'
import { useContext, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { selectCart, selectCartItems, selectCartTotal, selectCartItemsCount, selectCartLoading, selectCartError, selectGuestCartToken, selectCartInitialized, fetchCart, generateGuestCartToken, clearError, addToCart, updateCartItem, removeFromCart, clearCart, mergeGuestCart, clearGuestCartToken, resetCart } from '../redux/reducers/cart_reducer'


export const useCart = () => {
  const dispatch = useAppDispatch()
  const { addNotification } = useContext(NotificationContext)
  
  const cart = useAppSelector(selectCart)
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const itemsCount = useAppSelector(selectCartItemsCount)
  const loading = useAppSelector(selectCartLoading)
  const error = useAppSelector(selectCartError)
  const guestCartToken = useAppSelector(selectGuestCartToken)
  const initialized = useAppSelector(selectCartInitialized)

  // Initialize cart on first load
  useEffect(() => {
    if (!initialized) {
      dispatch(fetchCart())
    }
  }, [dispatch, initialized])

  // Generate guest token if needed
  useEffect(() => {
    if (!guestCartToken && items.length === 0) {
      dispatch(generateGuestCartToken())
    }
  }, [dispatch, guestCartToken, items.length])

  // Handle errors with notifications
  useEffect(() => {
    if (error) {
      addNotification(error, 'error')
      dispatch(clearError())
    }
  }, [error, addNotification, dispatch])

  const handleAddToCart = async (productId: number, quantity: number = 1) => {
    try {
      const result = await dispatch(addToCart({ product_id: productId, quantity }))
      if (addToCart.fulfilled.match(result)) {
        addNotification('تم إضافة المنتج إلى السلة بنجاح', 'success')
        return result.payload
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      const result = await dispatch(updateCartItem({ cartItemId, quantity }))
      if (updateCartItem.fulfilled.match(result)) {
        addNotification('تم تحديث الكمية بنجاح', 'success')
        return result.payload
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      const result = await dispatch(removeFromCart(cartItemId))
      if (removeFromCart.fulfilled.match(result)) {
        addNotification('تم حذف المنتج من السلة', 'success')
        return result.payload
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClearCart = async () => {
    try {
      const result = await dispatch(clearCart())
      if (clearCart.fulfilled.match(result)) {
        addNotification('تم إفراغ السلة بنجاح', 'success')
        return result.payload
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleMergeGuestCart = async () => {
    try {
      const result = await dispatch(mergeGuestCart())
      if (mergeGuestCart.fulfilled.match(result)) {
        addNotification('تم دمج السلة بنجاح', 'success')
        return result.payload
      }
    } catch (error) {
      console.log(error);
    }
  }

  const refreshCart = () => {
    dispatch(fetchCart())
  }

  const clearGuestToken = () => {
    dispatch(clearGuestCartToken())
  }

  const resetCartState = () => {
    dispatch(resetCart())
  }

  const getItemQuantity = (productId: number): number => {
    const item = items.find(item => item.product_id === productId)
    return item ? item.quantity : 0
  }

  const isItemInCart = (productId: number): boolean => {
    return items.some(item => item.product_id === productId)
  }

  const getCartItem = (productId: number) => {
    return items.find(item => item.product_id === productId)
  }

  return {
    // State
    cart,
    items,
    total,
    itemsCount,
    loading,
    error,
    guestCartToken,
    initialized,
    
    // Actions
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart,
    mergeGuestCart: handleMergeGuestCart,
    refreshCart,
    clearGuestToken,
    resetCart: resetCartState,
    
    // Utilities
    getItemQuantity,
    isItemInCart,
    getCartItem,
  }
}

// Separate hook for just cart data (useful for components that only need to read cart state)
export const useCartData = () => {
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const itemsCount = useAppSelector(selectCartItemsCount)
  const loading = useAppSelector(selectCartLoading)
  const initialized = useAppSelector(selectCartInitialized)

  return {
    items,
    total,
    itemsCount,
    loading,
    initialized,
  }
}
