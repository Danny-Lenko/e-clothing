import styled from 'styled-components'

interface BackgroundImgProps {
   img: string
}

export const BackgroundImg = styled.div<BackgroundImgProps>`
   width: 100%;
   height: 100%;
   background-size: cover;
   background-position: center;
   background-image: ${({ img }) => `url(${img})`};
`

export const Container = styled.div`
   min-width: 30%;
   height: calc(240rem / 16);
   flex: 1 1 auto;
   display: flex;
   align-items: center;
   justify-content: center;
   border: 1px solid black;
   margin: 0 7.5px 15px;
   overflow: hidden;
   contain: paint;

   &:hover {
      cursor: pointer;

      ${BackgroundImg} {
         transform: scale(1.1);
         transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
      }

      .content {
         opacity: 0.9;
      }
   }
`
export const Content = styled.div`
   height: calc(90rem / 16);
   padding: 0 25px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border: 1px solid black;
   background-color: white;
   opacity: 0.7;
   position: absolute;

   h2 {
      font-weight: bold;
      margin: 0 6px 0;
      font-size: calc(22rem / 16);
      color: #4a4a4a;
      text-transform: uppercase;
   }

   p {
      font-weight: lighter;
      font-size: 1rem;
   }
`
