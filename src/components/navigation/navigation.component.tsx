import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../lib/store/user/user.selector";
import { selectIsOpen } from "../../lib/store/cart/cart.selector";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { 
   NavContainer, 
   NavLinksContainer, 
   NavLink, 
   LogoContainer 
} from "./navigation.styles";
import { signOutStart } from "../../lib/store/user/user.action";

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
            <LogoContainer to='/'>
               <CrownLogo />
            </LogoContainer>
            <NavLinksContainer>
               <NavLink to='/shop'>
                  SHOP
               </NavLink>
               {
                  user ? (
                     <NavLink as='span'
                        className="nav-link"
                        onClick={handleClick}
                     >
                        SIGN OUT
                     </NavLink>
                  ) : (
                     <NavLink to='/auth'>
                        SIGN IN
                     </NavLink>
                  )
               }
               <CartIcon />
            </NavLinksContainer>
            {
               isOpen && <CartDropdown />
            }
         </NavContainer>
         <Outlet />
      </>
   );
}

export default Navigation;