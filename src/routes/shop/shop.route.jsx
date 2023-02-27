import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Categories from './categories/categories.route'
import Category from './category/category.route'
import { fetchCategoriesStart } from '../../lib/store/categories/categories.action'
import { selectCategoriesLoading } from '../../lib/store/categories/categories.selector'
import Spinner from '../../components/spinner/spinner.component'

const Shop = () => {
   const dispatch = useDispatch()
   const loading = useSelector(selectCategoriesLoading)

   useEffect(() => {
      dispatch(fetchCategoriesStart())
   }, [])

   console.log(loading)

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
