import './button.styles.scss'

const Button = ({ children, buttonType, ...otherProps }) => {
   const BUTTON_TYPES = {
      google: 'google',
      inverted: 'inverted'
   }

   return (
      <button
         className={`button-container ${BUTTON_TYPES[buttonType]}`}
         {...otherProps}
      >
         {children}
      </button>
   );
}

export default Button;