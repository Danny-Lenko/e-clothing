export const selectCategories = (state) => {
   return state.categories.categories &&
      state.categories.categories.reduce((acc, docSnapshot) => {
         const { title, items } = docSnapshot
         acc[title.toLowerCase()] = items
         return acc
      }, {})
}