export enum categoriesActionTypes {
   fetchCategoriesStart = 'category/fetchCategoriesStart',
   fetchCategoriesSuccess = 'category/fetchCategoriesSuccess',
   fetchCategoriesError = 'category/fetchCategoriesError'
}

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