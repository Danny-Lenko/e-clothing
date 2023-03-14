import { createAction } from '../../utils/createAction.utils'
import { categoriesActionTypes } from './categories.types'

export const fetchCategoriesStart = () =>
   createAction(categoriesActionTypes.fetchCategoriesStart)

export const fetchCategoriesSuccess = (categories) =>
   createAction(categoriesActionTypes.fetchCategoriesSuccess, categories)

export const fetchCategoriesError = (error) =>
   createAction(categoriesActionTypes.fetchCategoriesError, error)
