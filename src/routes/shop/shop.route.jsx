import { Routes, Route } from 'react-router-dom'
import Categories from './categories/categories.route';
import Category from './category/category.route';

const Shop = () => {
   return (
      <Routes>
         <Route index element={<Categories />} />
         <Route path=':category' element={<Category />} />
      </Routes>
   );
}

export default Shop;