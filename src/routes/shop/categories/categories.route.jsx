import { useContext } from "react";
import { CategoriesContext } from "../../../lib/contexts/categories.context";
import CategoryPreview from "../../../components/category-preview/category-preview.component";

const Categories = () => {
   const { categories } = useContext(CategoriesContext)

   if (!categories) return <h2>Loading...</h2>

   return (
      <>
         {
            Object.keys(categories).map(title => {
               const products = categories[title]
               return <CategoryPreview
                  key={title}
                  title={title}
                  products={products}
               />
            })
         }
      </>
   );
}

export default Categories;