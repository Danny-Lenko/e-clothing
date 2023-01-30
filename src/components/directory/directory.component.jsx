import { categories } from "../../lib/categories-data";
import Category from "../category/category.component";
import './directory.styles.scss'

const Directory = () => {

   return (
      <div className="directory-container">
         {
            categories.map(({ id, title, imageUrl }) =>
               <Category
                  key={id}
                  title={title}
                  img={imageUrl}
               />)
         }
      </div>
   );
}

export default Directory;