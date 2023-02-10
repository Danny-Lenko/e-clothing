import { useContext } from "react";
import { Outlet } from "react-router-dom";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../lib/contexts/user.context";
import { CartContext } from "../../lib/contexts/cart.context";
import { signOutUser } from "../../lib/utils/firebase.utils";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { NavContainer, NavLinksContainer, NavLink, LogoContainer } from "./navigation.styles";

const Navigation = () => {
   const { user } = useContext(UserContext)
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