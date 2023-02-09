import { useNavigate } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import './category-preview.styles.scss'

const CategoryPreview = ({ title, products }) => {
   const navigate = useNavigate()

   const handleClick = () => {
      navigate(title)
   }

   return (
      <>
         <h2>
            <span
               className="title"
               onClick={handleClick}
            >
               {title.toUpperCase()}
            </span>
         </h2>
         <div className="products-container" key={title}>
            {
               products
                  .slice(0, 4)
                  .map(product => <ProductCard
                     key={product.id}
                     product={product}
                  />)
            }
         </div>
      </>
   );
}

export default CategoryPreview;