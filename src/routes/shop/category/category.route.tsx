import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CategoriesContext } from '../../../lib/contexts/categories.context'
import ProductCard from '../../../components/product-card/product-card.component'
import { Title, Container } from './category.styles'

interface UseParamsProps {
   category: string
}

const Category = () => {
   const { category } = useParams<keyof UseParamsProps>() as UseParamsProps

   const { categoriesMap } = useContext(CategoriesContext)
   const [products, setProducts] = useState(categoriesMap[category])

   useEffect(() => {
      setProducts(categoriesMap[category])
   }, [category, categoriesMap])

   return (
      <>
         <Title>{category}</Title>
         <Container>
            {products &&
               products.map((product) => (
                  <ProductCard key={product.id} product={product} />
               ))}
         </Container>
      </>
   )
}

export default Category
