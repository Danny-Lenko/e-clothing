import { createContext, useState } from "react";

export const DropdownContext = createContext({
   isOpen: null,
   setIsOpen: () => null
})

export const DropdownContextProvider = ({ children }) => {
   const [isOpen, setIsOpen] = useState(false)
   const value = { isOpen, setIsOpen }

   return (
      <DropdownContext.Provider value={value}>
         {children}
      </DropdownContext.Provider>
   )
}