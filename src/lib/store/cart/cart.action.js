import { createAction } from '../../utils/createAction.utils'
import { cartActionTypes } from './cart.types'

const addProduct = (cartItems, product) => {
   const chosenProduct = cartItems.find((item) => item.id === product.id)

   if (!chosenProduct) {
      return [...cartItems, { ...product, ordered: 1 }]
   }

   return cartItems.map((item) =>
      item.id === product.id ? { ...item, ordered: item.ordered + 1 } : item
   )
}

const addItem = (cartItems, id) => {
   return cartItems.map((item) =>
      item.id === id ? { ...item, ordered: item.ordered + 1 } : item
   )
}

const removeItem = (cartItems, id) => {
   return cartItems
      .map((item) => {
         if (item.id !== id) return item

         return { ...item, ordered: item.ordered - 1 }
      })
      .filter((item) => item.ordered > 0)
}

export const setIsOpen = (value) => {
   return createAction(cartActionTypes.setIsOpen, value)
}

export const addCartItem = (cartItems, product) => {
   const newCartItems = addProduct(cartItems, product)
   return createAction(cartActionTypes.setCartItems, newCartItems)
}

export const removeTitle = (cartItems, titleId) => {
   const newCartItems = cartItems.filter((item) => item.id !== titleId)
   return createAction(cartActionTypes.setCartItems, newCartItems)
}

export const increaseOrder = (cartItems, id) => {
   const newCartItems = addItem(cartItems, id)
   return createAction(cartActionTypes.setCartItems, newCartItems)
}

export const decreaseOrder = (cartItems, id) => {
   const newCartItems = removeItem(cartItems, id)
   return createAction(cartActionTypes.setCartItems, newCartItems)
}
