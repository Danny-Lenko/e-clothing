import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase.utils";

export const UserContext = createContext({
   user: null,
   setUser: () => null
})

export const actionTypes = {
   setUser: 'setUser'
}

const userReducer = (state, action) => {
   const { type, payload } = action

   switch (type) {
      case actionTypes.setUser:
         return {
            ...state,
            user: payload
         }

      default:
         throw new Error()
   }
}

const initialState = {
   user: null
}

export const UserContextProvider = ({ children }) => {
   const [{ user }, dispatch] = useReducer(userReducer, initialState)

   const setUser = (user) => {
      dispatch({type: actionTypes.setUser, payload: user})
   }

   useEffect(() => {
      const unsubscribe = onAuthStateChangedListener(async (user) => {
         if (user) {
            await createUserDocumentFromAuth(user);
         }
         setUser(user)
      })

      return unsubscribe
   }, [])

   const value = { user }

   return (
      <UserContext.Provider value={value}>
         {children}
      </UserContext.Provider>
   )
}