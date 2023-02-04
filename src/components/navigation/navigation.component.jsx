import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../lib/contexts/user.context";
import { CartContext } from "../../lib/contexts/cart.context";
import { signOutUser } from "../../lib/utils/firebase.utils";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'

const Navigation = () => {
   const { user } = useContext(UserContext)
   const { isOpen } = useContext(CartContext)

   return (
      <>
         <div className="navigation">
            <Link to='/' className="logo-container">
               <CrownLogo />
            </Link>
            <div className="nav-links-container">
               <Link to='/shop' className="nav-link">
                  SHOP
               </Link>
               {
                  user ? (
                     <div
                        className="nav-link"
                        onClick={signOutUser}
                     >
                        SIGN OUT
                     </div>
                  ) : (
                     <Link to='/auth' className="nav-link">
                        SIGN IN
                     </Link>
                  )
               }
               <CartIcon />
            </div>
            {
               isOpen && <CartDropdown />
            }
         </div>
         <Outlet />
      </>
   );
}

export default Navigation;