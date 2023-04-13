import { createSelector } from 'reselect'
import { CategoriesState } from './categories.reducer'
import { CategoryItem } from './categories.types'
import { RootState } from '../store'

const selectCategoriesReducer = (state: RootState): CategoriesState => state.categories

const selectCategoriesInitial = createSelector(
   [selectCategoriesReducer],
   (categoriesSlice) => categoriesSlice.categories
)

type CategoriesGrouped = {
   [title: string]: CategoryItem[]
}

export const selectCategories = createSelector(
   [selectCategoriesInitial],
   (categories): CategoriesGrouped =>
      categories.reduce((acc, docSnapshot) => {
         const { title, items } = docSnapshot
         acc[title.toLowerCase()] = items
         return acc
      }, {} as CategoriesGrouped)
)

export const selectCategoriesLoading = createSelector(
   [selectCategoriesReducer],
   (categoriesSlice) => categoriesSlice.loading
)
