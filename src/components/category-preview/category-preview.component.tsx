import { useNavigate } from 'react-router-dom'
import ProductCard from '../product-card/product-card.component'
import { ICategory } from '../../lib/contexts/categories.context'
import { Title, Container } from './category-preview.styles'

interface Props {
   title: string
   products: ICategory[]
}

const CategoryPreview: React.FC<Props> = ({ title, products }) => {
   const navigate = useNavigate()

   const handleClick = () => {
      navigate(title)
   }

   return (
      <>
         <h2>
            <Title onClick={handleClick}>{title.toUpperCase()}</Title>
         </h2>
         <Container>
            {products.slice(0, 4).map((product) => (
               <ProductCard key={product.id} product={product} />
            ))}
         </Container>
      </>
   )
}

export default CategoryPreview
