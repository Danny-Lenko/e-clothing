import { takeLatest, call, put, all } from 'redux-saga/effects'

import { getCategoriesAndDocuments } from '../../utils/firebase.utils'

import {
   fetchCategoriesSuccess,
   fetchCategoriesError,
} from './categories.action'

import { categoriesActionTypes } from './categories.types'

export function* fetchCategoriesAsync() {
   try {
      const categoriesArray = yield call(
         getCategoriesAndDocuments,
         'categories'
      )
      yield put(fetchCategoriesSuccess(categoriesArray))
   } catch (error) {
      yield put(fetchCategoriesError(error))
   }
}

export function* onFetchCategories() {
   yield takeLatest(
      categoriesActionTypes.fetchCategoriesStart,
      fetchCategoriesAsync
   )
}

export function* categoriesSaga() {
   yield all([call(onFetchCategories)])
}
