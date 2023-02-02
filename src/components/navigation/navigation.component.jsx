import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../lib/contexts/user.context";
import { signOutUser } from "../../lib/utils/firebase.utils";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'

const Navigation = () => {
   const { user, setUser } = useContext(UserContext)

   const handleSignOut = async () => {
      await signOutUser()
      setUser(null)
   }

   return (
      <>
         <div className="navigation">
            <Link to='/' className="logo-container">
               <CrownLogo />
            </Link>
            <div className="nav-links-container">
               <Link to='/store' className="nav-link">
                  STORE
               </Link>
               {
                  user ? (
                     <div
                        className="nav-link"
                        onClick={ handleSignOut }
                     >
                        SIGN OUT
                     </div>
                  ) : (
                     <Link to='/auth' className="nav-link">
                        SIGN IN
                     </Link>
                  )
               }
            </div>
         </div>
         <Outlet />
      </>
   );
}

export default Navigation;