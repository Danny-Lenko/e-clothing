import { useSelector } from "react-redux";
import { selectCategories } from "../../../lib/store/categories/categories.selector";
import CategoryPreview from "../../../components/category-preview/category-preview.component";

const Categories = () => {
   const categories = useSelector(selectCategories)

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