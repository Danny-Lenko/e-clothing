import { categories } from "../../lib/categories-data";
import DirectoryCard from "../directory-card/directory-card.component";
import { Container } from "./directory.styles";

const Directory = () => {
   return (
      <Container>
         {
            categories.map(({ id, title, imageUrl }) =>
               <DirectoryCard
                  key={id}
                  title={title}
                  img={imageUrl}
               />)
         }
      </Container>
   );
}

export default Directory;