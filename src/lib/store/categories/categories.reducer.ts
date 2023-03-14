import { categoriesActionTypes } from './categories.types'
import { CategoryAction } from './categories.action'

const initialState = {
   categories: [],
   loading: false,
   error: null,
}

export const categoriesReducer = (state = initialState, action = {} as CategoryAction) => {
   const { type, payload } = action

   switch (type) {
      case categoriesActionTypes.fetchCategoriesStart:
         return { ...state, loading: true }
      case categoriesActionTypes.fetchCategoriesSuccess:
         return { ...state, categories: payload, loading: false }
      case categoriesActionTypes.fetchCategoriesError:
         return { ...state, error: payload, loading: false }
      default:
         return state
   }
}
