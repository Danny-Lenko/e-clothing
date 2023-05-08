import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import SignInForm from './sign-in-form.component'
import {
   emailSignInStart,
   googleSignInStart,
} from '../../lib/store/user/user.action'

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
            <SignInForm />
         </Provider>
      )
   })

   test('renders the correct text', () => {
      expect(screen.getByText('Already have an account?')).toBeInTheDocument()
      expect(
         screen.getByText('Sign in with your email & password')
      ).toBeInTheDocument()
      expect(screen.getByText('Sign In')).toBeInTheDocument()
      expect(screen.getByText('Sign In With Google')).toBeInTheDocument()
   })

   test('handles email and password change', async () => {
      fireEvent.change(screen.getByLabelText('User Email'), {
         target: { value: 'test@test.com' },
      })
      fireEvent.change(screen.getByLabelText('Password'), {
         target: { value: 'testpassword' },
      })
      await waitFor(() =>
         expect(screen.getByLabelText('User Email')).toHaveValue(
            'test@test.com'
         )
      )
      await waitFor(() =>
         expect(screen.getByLabelText('Password')).toHaveValue('testpassword')
      )
   })

   test('dispatches emailSignInStart action on form submit', async () => {
      fireEvent.change(screen.getByLabelText('User Email'), {
         target: { value: 'test@test.com' },
      })
      fireEvent.change(screen.getByLabelText('Password'), {
         target: { value: 'testpassword' },
      })
      fireEvent.click(screen.getByText('Sign In'))
      await waitFor(() =>
         expect(store.dispatch).toHaveBeenCalledWith(
            emailSignInStart('test@test.com', 'testpassword')
         )
      )
   })

   test('dispatches googleSignInStart action on Google button click', async () => {
      fireEvent.click(screen.getByText('Sign In With Google'))
      await waitFor(() =>
         expect(store.dispatch).toHaveBeenCalledWith(googleSignInStart())
      )
   })
})
