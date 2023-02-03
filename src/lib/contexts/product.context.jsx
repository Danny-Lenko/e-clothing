import { createContext, useEffect, useState } from "react";
import SHOP_DATA from '../../assets/shop-data/shop-data.json'

export const ProductContext = createContext({
   products: null,
   setProducts: () => null
})

export const ProductsContextProvider = ({ children }) => {
   const [products, setProducts] = useState(null)
   const value = { products, setProducts }

   useEffect(() => {
      setProducts(SHOP_DATA)
   }, [])

   return (
      <ProductContext.Provider value={value}>
         {children}
      </ProductContext.Provider>
   )
}