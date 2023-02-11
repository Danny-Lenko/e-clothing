import { useNavigate } from "react-router-dom";
import { 
   Container,
   BackgroundImg,
   Content
} from "./directory-card.styles";

const DirectoryCard = ({ title, img, path }) => {
   const navigate = useNavigate()

   const handleClick = () => {
      navigate(path)
   }

   return (
      <Container onClick={handleClick}>
         <BackgroundImg img={img} />
         <Content className='content'>
            <h2>{title}</h2>
            <p>Shop Now</p>
         </Content>
      </Container>
   );
}

export default DirectoryCard;