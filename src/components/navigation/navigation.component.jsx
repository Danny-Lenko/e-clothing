import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'

const Navigation = () => {
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
               <Link to='/auth' className="nav-link">
                  SIGN-IN
               </Link>
            </div>
         </div>
         <Outlet />
      </>
   );
}
 
export default Navigation;