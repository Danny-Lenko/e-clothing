import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/product-card/product-card.component";
import { CategoriesContext } from "../../../lib/contexts/categories.context";
import { Title, Container } from "./category.styles";

const Category = () => {
   const { category } = useParams()
   const { categories } = useContext(CategoriesContext)
   const [products, setProducts] = useState(categories[category])

   useEffect(() => {
      setProducts(categories[category])
   }, [category, categories])

   return (
      <>
         <Title>{category}</Title>
         <Container>
            {
               products && products.map(product => <ProductCard key={product.id} product={product} />)
            }
         </Container>
      </>
   );
}

export default Category;