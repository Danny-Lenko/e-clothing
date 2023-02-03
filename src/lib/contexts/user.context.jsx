import { useState, createContext, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase.utils";

export const UserContext = createContext({
   user: null,
   setUser: () => null
})

export const UserContextProvider = ({ children }) => {
   const [user, setUser] = useState(null)
   const value = { user, setUser }

   useEffect(() => {
      const unsubscribe = onAuthStateChangedListener(async (user) => {
         console.log(user)
         if (user) {
            await createUserDocumentFromAuth(user);
         }
         setUser(user)
      })

      return unsubscribe
   }, [])

   return (
      <UserContext.Provider value={value}>
         {children}
      </UserContext.Provider>
   )
}