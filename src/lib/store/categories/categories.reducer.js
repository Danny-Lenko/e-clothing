import { categoriesActionTypes } from "./categories.types"

const initialState = {
   categories: []
}

export const categoriesReducer = (state = initialState, action = {}) => {
   const { type, payload } = action

   switch (type) {
      case categoriesActionTypes.setCategory:
         return { ...state, categories: payload }
      default:
         return state
   }
}