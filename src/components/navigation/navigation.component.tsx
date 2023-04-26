import { Outlet } from 'react-router-dom'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import { useSelector, useDispatch } from 'react-redux'
import { selectIsOpen } from "../../lib/store/cart/cart.selector";
import { selectCurrentUser } from '../../lib/store/user/user.selector'
import { signOutStart } from '../../lib/store/user/user.action'

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import {
   NavContainer,
   NavLinksContainer,
   NavLink,
   LogoContainer,
} from './navigation.styles'

const Navigation = () => {
   const dispatch = useDispatch()
   const user = useSelector(selectCurrentUser)
   const isOpen = useSelector(selectIsOpen)

   const handleClick = () => {
      dispatch(signOutStart())
   }

   return (
      <>
         <NavContainer>
            <LogoContainer to="/">
               <CrownLogo />
            </LogoContainer>

            <NavLinksContainer>
               <NavLink to="/shop">SHOP</NavLink>
               {user ? (
                  <NavLink as="span" className="nav-link" onClick={handleClick}>
                     SIGN OUT
                  </NavLink>
               ) : (
                  <NavLink to="/auth">SIGN IN</NavLink>
               )}
               <CartIcon />
            </NavLinksContainer>

            {isOpen && <CartDropdown />}
         </NavContainer>
         <Outlet />
      </>
   )
}

export default Navigation
