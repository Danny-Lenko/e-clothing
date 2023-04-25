import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

// import { UserContext } from '../../lib/contexts/user.context'
import { CartContext } from '../../lib/contexts/cart.context'
// import { signOutUser } from '../../lib/utils/firebase.utils'
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
   const { isCartOpen } = useContext(CartContext)

   const dispatch = useDispatch()
   const user = useSelector(selectCurrentUser)
   // const isOpen = useSelector(selectIsOpen)

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

            {isCartOpen && <CartDropdown />}
         </NavContainer>
         <Outlet />
      </>
   )
}

export default Navigation
