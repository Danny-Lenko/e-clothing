import { createSlice } from '@reduxjs/toolkit'

export interface ICartItem {
   name: string
   price: number
   id: number
   imageUrl: string
   ordered: number
}

interface IInitialState {
   isOpen: boolean
   cartItems: ICartItem[]
}

type SetCartItems = (cartItems: ICartItem[], id: number) => ICartItem[]

const initialState: IInitialState = {
   isOpen: false,
   cartItems: [],
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      setIsOpen(state, action) {
         state.isOpen = action.payload
      },
      addProduct(state, action) {
         state.cartItems = addProductHelper(state.cartItems, action.payload)
      },
      removeProduct(state, action) {
         state.cartItems = removeProductHelper(state.cartItems, action.payload)
      },
      increaseOrder(state, action) {
         state.cartItems = increaseOrderHelper(state.cartItems, action.payload)
      },
      decreaseOrder(state, action) {
         state.cartItems = decreaseOrderHelper(state.cartItems, action.payload)
      },
   },
})

export const {
   setIsOpen,
   addProduct,
   removeProduct,
   increaseOrder,
   decreaseOrder,
} = cartSlice.actions
export const cartReducer = cartSlice.reducer

const addProductHelper = (cartItems: ICartItem[], product: ICartItem) => {
   const chosenProduct = cartItems.find((item) => item.id === product.id)

   if (!chosenProduct) {
      return [...cartItems, { ...product, ordered: 1 }]
   }

   return cartItems.map((item) =>
      item.id === product.id ? { ...item, ordered: item.ordered + 1 } : item
   )
}

const removeProductHelper: SetCartItems = (cartItems, productId) => {
   return cartItems.filter((item) => item.id !== productId)
}

const increaseOrderHelper: SetCartItems = (cartItems, id) => {
   return cartItems.map((item) =>
      item.id === id ? { ...item, ordered: item.ordered + 1 } : item
   )
}

const decreaseOrderHelper: SetCartItems = (cartItems, id) => {
   return cartItems
      .map((item) => {
         if (item.id !== id) return item

         return { ...item, ordered: item.ordered - 1 }
      })
      .filter((item) => item.ordered > 0)
}
