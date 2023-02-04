import { createContext, useState } from "react";

export const CartContext = createContext({
   isOpen: null,
   setIsOpen: () => null,
   cartItems: [],
   addCartItem: () => null
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

   const addCartItem = (product) => {
      setCartItems(addProduct(cartItems, product))
   }

   console.log(cartItems)

   const value = { isOpen, setIsOpen, cartItems, addCartItem }

   return (
      <CartContext.Provider value={value}>
         {children}
      </CartContext.Provider>
   )
}