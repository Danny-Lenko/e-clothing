import { AnyAction } from 'redux'
import {
   fetchCategoriesStart,
   fetchCategoriesSuccess,
   fetchCategoriesError,
} from './categories.action'
import { Category } from './categories.types'

export type CategoriesState = {
   readonly categories: Category[]
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
   action = {} as AnyAction
): CategoriesState => {
   if (fetchCategoriesStart.match(action)) {
      return { ...state, loading: true }
   }

   if (fetchCategoriesSuccess.match(action)) {
      return { ...state, categories: action.payload, loading: false }
   }

   if (fetchCategoriesError.match(action)) {
      return { ...state, error: action.payload, loading: false }
   }

   return state
}
