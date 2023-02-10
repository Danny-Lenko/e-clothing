import { 
   Container,
   BackgroundImg,
   Content
} from "./directory-card.styles";

const DirectoryCard = ({ title, img }) => {
   return (
      <Container>
         <BackgroundImg
            className='background-image'
            style={{
               backgroundImage: `url(${img})`
            }}
         ></BackgroundImg>
         <Content className='content'>
            <h2>{title}</h2>
            <p>Shop Now</p>
         </Content>
      </Container>
   );
}

export default DirectoryCard;