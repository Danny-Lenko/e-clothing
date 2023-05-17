import { render, screen } from '../../test-utils'
import SignInForm from './sign-in-form.component'
import {
   emailSignInStart,
   googleSignInStart,
} from '../../lib/store/user/user.action'
import userEvent from '@testing-library/user-event'
import { store } from '../../lib/store/store'

store.dispatch = jest.fn()

describe('SignInForm component', () => {
   test('renders the correct text', () => {
      render(<SignInForm />)
      expect(screen.getByText('Already have an account?')).toBeInTheDocument()
      expect(
         screen.getByText('Sign in with your email & password')
      ).toBeInTheDocument()
      expect(screen.getByText('Sign In')).toBeInTheDocument()
      expect(screen.getByText('Sign In With Google')).toBeInTheDocument()
   })

   test('handles email and password type', () => {
      render(<SignInForm />)
      userEvent.type(screen.getByLabelText('User Email'), 'test@test.com')
      userEvent.type(screen.getByLabelText('Password'), 'testpassword')
      expect(screen.getByLabelText('User Email')).toHaveValue('test@test.com')
      expect(screen.getByLabelText('Password')).toHaveValue('testpassword')
   })

   test('handles user tabs pressing', () => {
      render(<SignInForm />)
      const emailField = screen.getByLabelText(/email/i)
      const passwordField = screen.getByLabelText(/password/i)
      const signButton = screen.getByRole('button', { name: 'Sign In' })
      const signGoogle = screen.getByRole('button', { name: /google/i })
      userEvent.tab()
      expect(emailField).toHaveFocus()
      userEvent.tab()
      expect(passwordField).toHaveFocus()
      userEvent.tab()
      expect(signButton).toHaveFocus()
      userEvent.tab()
      expect(signGoogle).toHaveFocus()
   })

   test('dispatches emailSignInStart action on form submit', () => {
      render(<SignInForm />)
      userEvent.type(screen.getByLabelText('User Email'), 'test@test.com')
      userEvent.type(screen.getByLabelText('Password'), 'testpassword')
      userEvent.click(screen.getByText('Sign In'))
      expect(store.dispatch).toHaveBeenCalledWith(
         emailSignInStart('test@test.com', 'testpassword')
      )
   })

   test('dispatches googleSignInStart action on Google button click', () => {
      render(<SignInForm />)
      userEvent.click(screen.getByText('Sign In With Google'))
      expect(store.dispatch).toHaveBeenCalledWith(googleSignInStart())
   })
})
