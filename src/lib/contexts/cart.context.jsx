import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext({
   isOpen: null,
   cartItems: null,
   cartCount: null,
   total: null,
   setIsOpen: () => null,
   setCartItems: () => null,
   setCartCount: () => null,
   setTotal: () => null,
})

const initialState = {
   isOpen: null,
   cartItems: [],
   cartCount: null,
   total: null
}

export const actionTypes = {
   setIsOpen: 'setIsOpen',
   setCartItems: 'setCartItems',
   setCartCount: 'setCartCount',
   setTotal: 'setTotal'
}

const cartReducer = (state, action) => {
   const { type, payload } = action

   switch (type) {
      case actionTypes.setIsOpen:
         return { ...state, isOpen: payload }
      case actionTypes.setCartItems:
         return { ...state, cartItems: payload }
      case actionTypes.setCartCount:
         return { ...state, cartCount: payload }
      case actionTypes.setTotal:
         return { ...state, total: payload }

      default:
         throw new Error()
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
   const [{
      isOpen,
      cartItems,
      cartCount,
      total
   }, dispatch] = useReducer(cartReducer, initialState)

   const setIsOpen = (value) => {
      dispatch({
         type: actionTypes.setIsOpen,
         payload: value
      })
   }

   const addCartItem = (product) => {
      dispatch({
         type: actionTypes.setCartItems,
         payload: addProduct(cartItems, product)
      })
   }

   const removeTitle = (titleId) => {
      dispatch({
         type: actionTypes.setCartItems,
         payload: cartItems.filter(item => item.id !== titleId)
      })
   }

   const increaseOrder = (id) => {
      dispatch({
         type: actionTypes.setCartItems,
         payload: addItem(cartItems, id)
      })
   }

   const decreaseOrder = (id) => {
      dispatch({
         type: actionTypes.setCartItems,
         payload: removeItem(cartItems, id)
      })
   }

   useEffect(() => {
      dispatch({
         type: actionTypes.setCartCount,
         payload: cartItems.reduce((acc, cartItem) => acc + cartItem.ordered, 0)
      })
   }, [cartItems])

   useEffect(() => {
      dispatch({
         type: actionTypes.setTotal,
         payload: cartItems.reduce((total, cartItem) => {
            return total + cartItem.ordered * cartItem.price
         }, 0)
      })
   }, [cartItems])

   const value = {
      isOpen,
      setIsOpen,
      cartItems,
      addCartItem,
      cartCount,
      removeTitle,
      increaseOrder,
      decreaseOrder,
      total
   }

   return (
      <CartContext.Provider value={value}>
         {children}
      </CartContext.Provider>
   )
}