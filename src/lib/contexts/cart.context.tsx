import { createContext, useState, useEffect } from 'react'
import { ICategory } from './categories.context'

export interface ICartItem {
   name: string
   price: number
   id: number
   imageUrl: string
   quantity?: number
}

const addCartItem = (cartItems: ICartItem[], productToAdd: ICategory) => {
   const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
   )

   if (existingCartItem) {
      return cartItems.map((cartItem) =>
         cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity! + 1 }
            : cartItem
      )
   }

   return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (
   cartItems: ICartItem[],
   cartItemToRemove: ICartItem
) => {
   const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
   )

   if (existingCartItem?.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
   }

   return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
         ? { ...cartItem, quantity: cartItem.quantity! - 1 }
         : cartItem
   )
}

const clearCartItem = (cartItems: ICartItem[], cartItemToClear: ICartItem) =>
   cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

export interface ICartContext {
   isCartOpen: boolean
   setIsCartOpen: (prevState: boolean) => void
   cartItems: ICartItem[]
   addItemToCart: (item: ICategory) => void
   removeItemFromCart: (item: ICartItem) => void
   clearItemFromCart: (item: ICartItem) => void
   cartCount: number
   cartTotal: number
}

export const CartContext = createContext<ICartContext>({
   isCartOpen: false,
   setIsCartOpen: (prevState) => {},
   cartItems: [],
   addItemToCart: () => {},
   removeItemFromCart: () => {},
   clearItemFromCart: () => {},
   cartCount: 0,
   cartTotal: 0,
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
   const [isCartOpen, setIsCartOpen] = useState(false)
   const [cartItems, setCartItems] = useState<ICartItem[]>([])
   const [cartCount, setCartCount] = useState(0)
   const [cartTotal, setCartTotal] = useState(0)

   useEffect(() => {
      const newCartCount = cartItems.reduce(
         (total, cartItem) => total + cartItem.quantity!,
         0
      )
      setCartCount(newCartCount)
   }, [cartItems])

   useEffect(() => {
      const newCartTotal = cartItems.reduce(
         (total, cartItem) => total + cartItem.quantity! * cartItem.price,
         0
      )
      setCartTotal(newCartTotal)
   }, [cartItems])

   const addItemToCart = (productToAdd: ICategory) => {
      setCartItems(addCartItem(cartItems, productToAdd))
   }

   const removeItemFromCart = (cartItemToRemove: ICartItem) => {
      setCartItems(removeCartItem(cartItems, cartItemToRemove))
   }

   const clearItemFromCart = (cartItemToClear: ICartItem) => {
      setCartItems(clearCartItem(cartItems, cartItemToClear))
   }

   const value = {
      isCartOpen,
      setIsCartOpen,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      cartItems,
      cartCount,
      cartTotal,
   }

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
