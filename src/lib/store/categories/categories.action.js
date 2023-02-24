import { createAction } from '../../utils/createAction.utils'
import { categoriesActionTypes } from './categories.types'
import { getCategoriesAndDocuments } from '../../utils/firebase.utils'

export const fetchCategoriesStart = () =>
   createAction(categoriesActionTypes.fetchCategoriesStart)

export const fetchCategoriesSuccess = (categories) =>
   createAction(categoriesActionTypes.fetchCategoriesSuccess, categories)

export const fetchCategoriesError = (error) =>
   createAction(categoriesActionTypes.fetchCategoriesError, error)

export const fetchCategoriesAsync = () => async (dispatch) => {
   dispatch(fetchCategoriesStart())
   try {
      const categories = await getCategoriesAndDocuments()
      dispatch(fetchCategoriesSuccess(categories))
   } catch (error) {
      dispatch(fetchCategoriesError(error))
   }
}
