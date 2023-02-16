import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../lib/store/user/user.selector";
import { CartContext } from "../../lib/contexts/cart.context";
import { signOutUser } from "../../lib/utils/firebase.utils";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { 
   NavContainer, 
   NavLinksContainer, 
   NavLink, 
   LogoContainer 
} from "./navigation.styles";

const Navigation = () => {
   const user = useSelector(selectCurrentUser)
   const { isOpen } = useContext(CartContext)

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
                        onClick={signOutUser}
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