import { useDispatch } from 'react-redux'
import { updatePayload } from './cart.action'
import { useSelector } from 'react-redux'
import { selectCartItems } from './cart.selector'

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

export const useCartUtils = () => {
   const cartItems = useSelector(selectCartItems)
   const dispatch = useDispatch()

   const setIsOpen = (value) => {
      dispatch(updatePayload({ isOpen: value }))
   }

   const addCartItem = (product) => {
      const newCartItems = addProduct(cartItems, product)
      updateCartItemsReducer(newCartItems)
   }

   const removeTitle = (titleId) => {
      const newCartItems = cartItems.filter((item) => item.id !== titleId)
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
         (acc, cartItem) => acc + cartItem.ordered,
         0
      )
      const newCartTotal = newCartItems.reduce((total, cartItem) => {
         return total + cartItem.ordered * cartItem.price
      }, 0)

      const newState = {
         cartItems: newCartItems,
         cartCount: newCartCount,
         cartTotal: newCartTotal,
      }

      dispatch(updatePayload(newState))
   }

   return {
      setIsOpen,
      addCartItem,
      removeTitle,
      increaseOrder,
      decreaseOrder,
   }
}
