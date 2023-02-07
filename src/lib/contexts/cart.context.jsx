import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
   isOpen: null,
   setIsOpen: () => null,
   cartItems: [],
   addCartItem: () => null,
   cartCount: 0
})

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

export const CartContextProvider = ({ children }) => {
   const [isOpen, setIsOpen] = useState(false)
   const [cartItems, setCartItems] = useState([])
   const [cartCount, setCartCount] = useState(0)

   const addCartItem = (product) => {
      setCartItems(addProduct(cartItems, product))
   }

   useEffect(() => {
      setCartCount(
         cartItems.reduce((acc, cartItem) => acc + cartItem.ordered, 0)
      )
   }, [cartItems])

   const value = {
      isOpen,
      setIsOpen,
      cartItems,
      addCartItem,
      cartCount
   }

   return (
      <CartContext.Provider value={value}>
         {children}
      </CartContext.Provider>
   )
}