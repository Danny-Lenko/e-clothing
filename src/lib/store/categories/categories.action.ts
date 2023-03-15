import { createAction, ActionWithPayload } from '../../utils/createAction.utils'
import { categoriesActionTypes } from './categories.types'
import { Action } from '../../utils/createAction.utils'

export type CategoryItem = {
   id: number
   imageUrl: string
   price: number
   name: string
}

export type Categories = {
   id: number
   title: string
   items: CategoryItem[]
}

export type FetchCategoriesStart =
   Action<categoriesActionTypes.fetchCategoriesStart>

export type FetchCategoriesSuccess = ActionWithPayload<
   categoriesActionTypes.fetchCategoriesSuccess,
   Categories
>

export type FetchCategoriesError = ActionWithPayload<
   categoriesActionTypes.fetchCategoriesError,
   Error
>

export type CategoryAction =
   | FetchCategoriesStart
   | FetchCategoriesSuccess
   | FetchCategoriesError

export const fetchCategoriesStart = (): FetchCategoriesStart =>
   createAction(categoriesActionTypes.fetchCategoriesStart)

export const fetchCategoriesSuccess = (
   categories: Categories
): FetchCategoriesSuccess =>
   createAction(categoriesActionTypes.fetchCategoriesSuccess, categories)

export const fetchCategoriesError = (error: Error): FetchCategoriesError =>
   createAction(categoriesActionTypes.fetchCategoriesError, error)
