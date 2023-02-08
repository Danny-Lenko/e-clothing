import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase.utils";

export const ProductContext = createContext({
   products: null,
   setProducts: () => null
})

export const ProductsContextProvider = ({ children }) => {
   const [products, setProducts] = useState([])
   const value = { products, setProducts }

   useEffect(() => {
      const getCategories = async () => {
         const categoryMap = await getCategoriesAndDocuments()
         console.log(categoryMap)
      }
      getCategories()
   }, [])

   return (
      <ProductContext.Provider value={value}>
         {children}
      </ProductContext.Provider>
   )
}