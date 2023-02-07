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
      .filter(item => item.ordered > 0 )   
}

export const CartContextProvider = ({ children }) => {
   const [isOpen, setIsOpen] = useState(false)
   const [cartItems, setCartItems] = useState([])
   const [cartCount, setCartCount] = useState(0)
   const [total, setTotal] = useState(0)

   const addCartItem = (product) => {
      setCartItems(addProduct(cartItems, product))
   }

   const removeTitle = (titleId) => {
      setCartItems(cartItems.filter(item => item.id !== titleId))
   }

   const increaseOrder = (id) => {
      setCartItems(addItem(cartItems, id))
   }

   const decreaseOrder = (id) => {
      setCartItems(removeItem(cartItems, id))
   }

   useEffect(() => {
      setCartCount(
         cartItems.reduce((acc, cartItem) => acc + cartItem.ordered, 0)
      )
      setTotal(
         cartItems.reduce((total, cartItem) => {
            return total + cartItem.ordered * cartItem.price 
         }, 0)
      )
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