import { useContext } from "react";
import { ProductContext } from "../../lib/contexts/product.context";

const Shop = () => {
   const { products } = useContext(ProductContext)

   if (!products) return <h2>Loading...</h2>

   return (
      <>
         <h2>Hello Shop</h2>
         {
            products.map(({ id, name }) => <h3 key={id}>{name}</h3>)
         }
      </>
   );
}

export default Shop;