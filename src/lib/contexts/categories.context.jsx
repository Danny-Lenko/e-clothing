import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase.utils";

export const CategoriesContext = createContext({
   categories: {}
})

export const CategoriesContextProvider = ({ children }) => {
   const [categories, setCategories] = useState({})
   
   useEffect(() => {
      const getCategories = async () => {
         const categoryMap = await getCategoriesAndDocuments()
         setCategories(categoryMap)
      }
      getCategories()
   }, [])
   
   const value = { categories }
   
   return (
      <CategoriesContext.Provider value={value}>
         {children}
      </CategoriesContext.Provider>
   )
}