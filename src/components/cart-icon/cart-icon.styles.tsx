import styled from 'styled-components'
import { ReactComponent as ShoppingBag } from '../../assets/shopping-bag.svg'

export const Container = styled.div`
   width: calc(45rem / 16);
   height: calc(45rem / 16);
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
`

export const Image = styled(ShoppingBag)`
   width: calc(20rem / 16);
   height: calc(20rem / 16);
`

export const ItemCount = styled.span`
   position: absolute;
   font-size: calc(10rem / 16);
   font-weight: bold;
   top: 50%;
   transform: translateY(-30%);
`
