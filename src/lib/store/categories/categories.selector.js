import { createSelector } from 'reselect'

const categories = (state) => state.categories

export const selectCategories = createSelector(
   [categories],
   (categories) =>
      categories.categories.reduce((acc, docSnapshot) => {
         const { title, items } = docSnapshot
         acc[title.toLowerCase()] = items
         return acc
      }, {})
)
