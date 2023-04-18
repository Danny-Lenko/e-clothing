import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Categories from './categories/categories.route'
import Category from './category/category.route'
import Spinner from '../../components/spinner/spinner.component'
import { CategoriesContext } from '../../lib/contexts/categories.context'

const Shop = () => {
   const {
      // categoriesMap: categories,
      loading,
      // error,
   } = useContext(CategoriesContext)

   // const dispatch = useDispatch()
   // const loading = useSelector(selectCategoriesLoading)
   // const categories = useSelector(selectCategories)

   // useEffect(() => {
   //    if (!Object.keys(categories).length) {
   //       dispatch(fetchCategoriesStart())
   //    }
   // }, [])

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
