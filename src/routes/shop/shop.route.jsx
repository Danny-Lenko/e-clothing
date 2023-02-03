import { useContext } from "react";
import { ProductContext } from "../../lib/contexts/product.context";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss'

const Shop = () => {
   const { products } = useContext(ProductContext)

   if (!products) return <h2>Loading...</h2>

   return (
      <>
         <h2>Hello Shop</h2>
         <div className="products-container">
            {
               products.map(product => <ProductCard
                  key={product.id}
                  product={product}
               />)
            }
         </div>
      </>
   );
}

export default Shop;