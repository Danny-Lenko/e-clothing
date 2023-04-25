import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

import ProductCard from '../../../components/product-card/product-card.component'
import Spinner from '../../../components/spinner/spinner.component'

import { Title, Container } from './category.styles'
import { ICategory } from '../../../lib/contexts/categories.context'

const GET_CATEGORY = gql`
   query ($title: String) {
      getCollectionsByTitle(title: $title) {
         title
         id
         items {
            id
            name
            price
            imageUrl
         }
      }
   }
`

const Category = () => {
   const { category } = useParams()
   const { loading, error, data } = useQuery(GET_CATEGORY, {
      variables: { title: category },
   })
   const [products, setProducts] = useState<ICategory[] | null>(null)

   useEffect(() => {
      if (data) {
         const {
            getCollectionsByTitle: { items },
         } = data
         setProducts(items)
      }
   }, [category, data])

   return (
      <>
         {loading ? (
            <Spinner />
         ) : (
            <>
               <Title>{category}</Title>
               <Container>
                  {products &&
                     products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                     ))}
               </Container>
            </>
         )}
      </>
   )
}

export default Category
