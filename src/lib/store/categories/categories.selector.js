import { createSelector } from 'reselect'

const selectCategoriesReducer = (state) => state.categories

const selectCategoriesInitial = createSelector(
   [selectCategoriesReducer],
   (categoriesSlice) => categoriesSlice.categories
)

export const selectCategories = createSelector(
   [selectCategoriesInitial],
   (categories) =>
      categories.reduce((acc, docSnapshot) => {
         const { title, items } = docSnapshot
         acc[title.toLowerCase()] = items
         return acc
      }, {})
)

export const selectCategoriesLoading = createSelector(
   [selectCategoriesReducer],
   (categoriesSlice) => categoriesSlice.loading
)
