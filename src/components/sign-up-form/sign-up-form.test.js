import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import SignUpForm from './sign-up-form.component'
import { signUpStart } from '../../lib/store/user/user.action'

const mockStore = configureStore([])

describe('SignInForm component', () => {
   let store

   beforeEach(() => {
      store = mockStore({
         user: {},
      })
      store.dispatch = jest.fn()
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
         <Provider store={store}>
            <SignUpForm />
         </Provider>
      )
   })

   test('renders the correct text', () => {
      expect(
         screen.getByText(/Sign up with your email & password/i)
      ).toBeInTheDocument()
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument()
   })

   test('handles field values change', async () => {
      fireEvent.change(screen.getByLabelText(/Name/i), {
         target: { value: 'testname' },
      })
      fireEvent.change(screen.getByLabelText('User Email'), {
         target: { value: 'test@test.com' },
      })
      fireEvent.change(screen.getByLabelText('Password'), {
         target: { value: 'testpassword' },
      })
      fireEvent.change(screen.getByLabelText(/Confirm Passwor/i), {
         target: { value: 'testconfirm' },
      })
      await waitFor(() =>
         expect(screen.getByLabelText(/Name/i)).toHaveValue('testname')
      )
      await waitFor(() =>
         expect(screen.getByLabelText(/Email/i)).toHaveValue('test@test.com')
      )
      await waitFor(() =>
         expect(screen.getByLabelText('Password')).toHaveValue('testpassword')
      )
      await waitFor(() =>
         expect(screen.getByLabelText(/Confirm Password/i)).toHaveValue(
            'testconfirm'
         )
      )
   })

   test('dispatches emailSignUpStart action on form submit', async () => {
      fireEvent.change(screen.getByLabelText(/User Name/i), {
         target: { value: 'test' },
      })
      fireEvent.change(screen.getByLabelText(/User Email/i), {
         target: { value: 'test@example.com' },
      })
      fireEvent.change(screen.getByLabelText('Password'), {
         target: { value: 'password' },
      })
      fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
         target: { value: 'password' },
      })
      fireEvent.click(screen.getByRole('button', /Sign Up/i))
      expect(store.dispatch).toHaveBeenCalledWith(
         signUpStart('test@example.com', 'password', 'test')
      )
   })
})
