import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Categories from './categories/categories.route'
import Category from './category/category.route'
import Spinner from '../../components/spinner/spinner.component'
import { CategoriesContext } from '../../lib/contexts/categories.context'

const Shop = () => {
   const {
      loading,
      error
   } = useContext(CategoriesContext)

   return (
      <>
         {loading ? (
            <Spinner />
         ) : (
            <Routes>
               <Route index element={<Categories />} />
               <Route path=":category" element={<Category />} />
            </Routes>
         )}
      </>
   )
}

export default Shop
