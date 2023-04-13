import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { getCategoriesAndDocuments } from '../../utils/firebase.utils'

import {
   fetchCategoriesSuccess,
   fetchCategoriesError,
} from './categories.action'

import { categoriesActionTypes } from './categories.types'

export function* fetchCategoriesAsync() {
   try {
      const categoriesArray = yield* call(
         getCategoriesAndDocuments
      )
      yield* put(fetchCategoriesSuccess(categoriesArray))
   } catch (error) {
      yield* put(fetchCategoriesError(error as Error))
   }
}

export function* onFetchCategories() {
   yield* takeLatest(
      categoriesActionTypes.fetchCategoriesStart,
      fetchCategoriesAsync
   )
}

export function* categoriesSaga() {
   yield* all([call(onFetchCategories)])
}
