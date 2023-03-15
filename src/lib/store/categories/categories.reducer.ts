import { categoriesActionTypes } from './categories.types'
import { CategoryAction, Categories } from './categories.action'

export type CategoriesState = {
   readonly categories: Categories[]
   readonly loading: boolean
   readonly error: Error | null
}

const initialState: CategoriesState = {
   categories: [],
   loading: false,
   error: null,
}

export const categoriesReducer = (
   state = initialState,
   action = {} as CategoryAction
) => {
   switch (action.type) {
      case categoriesActionTypes.fetchCategoriesStart:
         return { ...state, loading: true }
      case categoriesActionTypes.fetchCategoriesSuccess:
         return { ...state, categories: action.payload, loading: false }
      case categoriesActionTypes.fetchCategoriesError:
         return { ...state, error: action.payload, loading: false }
      default:
         return state
   }
}
