import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/product-card/product-card.component";
import { selectCategories } from "../../../lib/store/categories/categories.selector";
import { Title, Container } from "./category.styles";

const Category = () => {
   const { category } = useParams()
   const categories = useSelector(selectCategories)
   const [products, setProducts] = useState(null)

   useEffect(() => {
      setProducts(categories ? categories[category] : null)
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