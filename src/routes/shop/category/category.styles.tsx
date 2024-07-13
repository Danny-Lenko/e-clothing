import styled from 'styled-components'

export const Title = styled.h2`
   font-size: calc(38rem / 16);
   margin-bottom: calc(25rem / 16);
   text-align: center;
   text-transform: uppercase;
`

export const Container = styled.div`
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   column-gap: 10px;
   row-gap: 50px;
`
