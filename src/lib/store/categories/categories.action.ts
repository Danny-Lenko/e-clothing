import {
   createAction,
   ActionWithPayload,
   Action,
   withMatcher,
} from '../../utils/createAction.utils'
import { categoriesActionTypes } from './categories.types'

export type CategoryItem = {
   id: number
   imageUrl: string
   price: number
   name: string
}

export type Category = {
   id: number
   title: string
   items: CategoryItem[]
}

export type FetchCategoriesStart =
   Action<categoriesActionTypes.fetchCategoriesStart>

export type FetchCategoriesSuccess = ActionWithPayload<
   categoriesActionTypes.fetchCategoriesSuccess,
   Category[]
>

export type FetchCategoriesError = ActionWithPayload<
   categoriesActionTypes.fetchCategoriesError,
   Error
>

export const fetchCategoriesStart = withMatcher(
   (): FetchCategoriesStart =>
      createAction(categoriesActionTypes.fetchCategoriesStart)
)

export const fetchCategoriesSuccess = withMatcher(
   (categories: Category[]): FetchCategoriesSuccess =>
      createAction(categoriesActionTypes.fetchCategoriesSuccess, categories)
)

export const fetchCategoriesError = withMatcher(
   (error: Error): FetchCategoriesError =>
      createAction(categoriesActionTypes.fetchCategoriesError, error)
)
