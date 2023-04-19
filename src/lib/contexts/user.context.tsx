import { createContext, useState, useEffect } from 'react'
import { User } from 'firebase/auth'
import {
   onAuthStateChangedListener,
   createUserDocumentFromAuth,
} from '../utils/firebase.utils'

interface UserContextInterface {
   setCurrentUser: (user: User | null) => void
   currentUser: User | null
}

export const UserContext = createContext<UserContextInterface>({
   setCurrentUser: () => null,
   currentUser: null,
})

interface UserProviderProps {
   children: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
   const [currentUser, setCurrentUser] = useState<User | null>(null)
   const value = { currentUser, setCurrentUser }

   useEffect(() => {
      const unsubscribe = onAuthStateChangedListener((user) => {
         if (user) {
            createUserDocumentFromAuth(user)
         }
         setCurrentUser(user)
      })

      return unsubscribe
   }, [])

   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
