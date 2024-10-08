import styled from 'styled-components'

export const Container = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   height: calc(350rem / 16);
   align-items: center;
   position: relative;

   img {
      width: 100%;
      height: calc(320rem / 16);
      object-fit: cover;
      margin-bottom: 5px;
   }

   button {
      opacity: 0.7;
      position: absolute;
      top: calc(255rem / 16);
      display: none;
      font-size: 0.9rem;
   }

   &:hover {
      img {
         opacity: 0.8;
      }

      button {
         opacity: 0.85;
         display: flex;
      }
   }

   @media screen and (max-width: 800px) {
      width: 40vw;

      button {
         display: block;
         opacity: 0.9;
         min-width: unset;
         padding: 0 10px;

         &:hover {
            img {
               opacity: unset;
            }

            button {
               opacity: unset;
            }
         }
      }
   }

   @media screen and (max-width: 400px) {
      width: 80vw;
   }
`

export const Footer = styled.div`
   width: 100%;
   height: 5%;
   display: flex;
   justify-content: space-between;
   font-size: calc(18rem / 16);
`

export const Name = styled.span`
   margin-bottom: 15px;
`

export const Price = styled.span``
