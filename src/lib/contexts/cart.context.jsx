import { createContext, useReducer } from "react";

export const CartContext = createContext({
   isOpen: null,
   cartItems: null,
   cartCount: null,
   cartTotal: null,
   updatePayload: () => null,
})

const initialState = {
   isOpen: null,
   cartItems: [],
   cartCount: 0,
   cartTotal: 0
}

export const actionTypes = {
   updatePayload: 'updatePayload'
}

const cartReducer = (state, action) => {
   const { type, payload } = action

   switch (type) {
      case actionTypes.updatePayload:
         return { ...state, ...payload }
      default:
         throw new Error(`failed to dispatch ${type} type action`)
   }
}

const addProduct = (cartItems, product) => {
   const chosenProduct = cartItems.find(item => item.id === product.id)

   if (!chosenProduct) {
      return [...cartItems, { ...product, ordered: 1 }]
   }

   return cartItems.map(item =>
      item.id === product.id
         ? { ...item, ordered: item.ordered + 1 }
         : item
   )
}

const addItem = (cartItems, id) => {
   return cartItems.map(item => item.id === id
      ? { ...item, ordered: item.ordered + 1 }
      : item
   )
}

const removeItem = (cartItems, id) => {
   return cartItems.map(item => {
      if (item.id !== id) return item

      return { ...item, ordered: item.ordered - 1 }
   })
      .filter(item => item.ordered > 0)
}

export const CartContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(cartReducer, initialState)
   const { isOpen, cartItems, cartCount, cartTotal } = state

   const setIsOpen = (value) => {
      dispatch({
         type: actionTypes.updatePayload,
         payload: { ...state, isOpen: value }
      })
   }

   const addCartItem = (product) => {
      const newCartItems = addProduct(cartItems, product)
      updateCartItemsReducer(newCartItems)
   }

   const removeTitle = (titleId) => {
      const newCartItems = cartItems.filter(item => item.id !== titleId)
      updateCartItemsReducer(newCartItems)
   }

   const increaseOrder = (id) => {
      const newCartItems = addItem(cartItems, id)
      updateCartItemsReducer(newCartItems)
   }

   const decreaseOrder = (id) => {
      const newCartItems = removeItem(cartItems, id)
      updateCartItemsReducer(newCartItems)
   }

   const updateCartItemsReducer = (newCartItems) => {
      const newCartCount = newCartItems.reduce(
         (acc, cartItem) => acc + cartItem.ordered, 0
      )
      const newCartTotal = newCartItems.reduce((total, cartItem) => {
         return total + cartItem.ordered * cartItem.price
      }, 0)

      const newState = {
         cartItems: newCartItems,
         cartCount: newCartCount,
         cartTotal: newCartTotal
      }

      dispatch({
         type: actionTypes.updatePayload,
         payload: newState
      })
   }

   const value = {
      isOpen,
      cartItems,
      cartCount,
      cartTotal,
      setIsOpen,
      addCartItem,
      removeTitle,
      increaseOrder,
      decreaseOrder
   }

   return (
      <CartContext.Provider value={value}>
         {children}
      </CartContext.Provider>
   )
}