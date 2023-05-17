import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import SignUpForm from './sign-up-form.component'
import { signUpStart } from '../../lib/store/user/user.action'
import { store } from '../../lib/store/store'

store.dispatch = jest.fn()

describe('SignInForm component', () => {
   test('renders the correct text', () => {
      render(<SignUpForm />)

      expect(
         screen.getByText(/Sign up with your email & password/i)
      ).toBeInTheDocument()
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument()
   })

   test('handles field values change', () => {
      render(<SignUpForm />)

      userEvent.type(screen.getByLabelText(/Name/i), 'testname')
      expect(screen.getByLabelText(/Name/i)).toHaveValue('testname')

      userEvent.type(screen.getByLabelText('User Email'), 'test@test.com')
      expect(screen.getByLabelText(/Email/i)).toHaveValue('test@test.com')

      userEvent.type(screen.getByLabelText('Password'), 'testpassword')
      expect(screen.getByLabelText('Password')).toHaveValue('testpassword')

      userEvent.type(screen.getByLabelText(/Confirm Passwor/i), 'testconfirm')
      expect(screen.getByLabelText(/Confirm Password/i)).toHaveValue(
         'testconfirm'
      )
   })

   test('dispatches emailSignUpStart action on form submit', async () => {
      render(<SignUpForm />)

      userEvent.type(screen.getByLabelText(/Name/i), 'test')
      userEvent.type(screen.getByLabelText(/User Email/i), 'test@example.com')
      userEvent.type(screen.getByLabelText('Password'), 'password')
      userEvent.type(screen.getByLabelText(/Confirm Password/i), 'password')
      userEvent.click(screen.getByRole('button', /Sign Up/i))
      expect(store.dispatch).toHaveBeenCalledWith(
         signUpStart('test@example.com', 'password', 'test')
      )
   })
})
