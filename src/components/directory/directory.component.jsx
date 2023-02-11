import { categories } from "../../lib/categories-data";
import DirectoryCard from "../directory-card/directory-card.component";
import { Container } from "./directory.styles";

const Directory = () => {
   return (
      <Container>
         {
            categories.map(({ id, title, imageUrl, path }) =>
               <DirectoryCard
                  key={id}
                  title={title}
                  img={imageUrl}
                  path={path}
               />)
         }
      </Container>
   );
}

export default Directory;