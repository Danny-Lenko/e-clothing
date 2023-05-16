import { render, fireEvent, screen } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import SignInForm from './sign-in-form.component'
import {
   emailSignInStart,
   googleSignInStart,
} from '../../lib/store/user/user.action'
import { userReducer } from '../../lib/store/user/user.reducer'
import userEvent from '@testing-library/user-event'

const mockStore = configureStore([])

const renderWithRedux = (
   component,
   { initialState, store = createStore(userReducer, initialState) } = {}
) => {
   return {
      ...render(<Provider store={store}>{component}</Provider>),
      store,
   }
}

describe('SignInForm component', () => {
   test('renders the correct text', () => {
      renderWithRedux(<SignInForm />)
      expect(screen.getByText('Already have an account?')).toBeInTheDocument()
      expect(
         screen.getByText('Sign in with your email & password')
      ).toBeInTheDocument()
      expect(screen.getByText('Sign In')).toBeInTheDocument()
      expect(screen.getByText('Sign In With Google')).toBeInTheDocument()
   })

   test('handles email and password type', () => {
      renderWithRedux(<SignInForm />)

      userEvent.type(screen.getByLabelText('User Email'), 'test@test.com')
      userEvent.type(screen.getByLabelText('Password'), 'testpassword')
      expect(screen.getByLabelText('User Email')).toHaveValue('test@test.com')
      expect(screen.getByLabelText('Password')).toHaveValue('testpassword')
   })

   test('handles user tabs pressing', () => {
      renderWithRedux(<SignInForm />)

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
      const { store } = renderWithRedux(<SignInForm />)
      store.dispatch = jest.fn()

      fireEvent.change(screen.getByLabelText('User Email'), {
         target: { value: 'test@test.com' },
      })
      fireEvent.change(screen.getByLabelText('Password'), {
         target: { value: 'testpassword' },
      })
      userEvent.click(screen.getByText('Sign In'))
      expect(store.dispatch).toHaveBeenCalledWith(
         emailSignInStart('test@test.com', 'testpassword')
      )
   })

   test('dispatches googleSignInStart action on Google button click', () => {
      const store = mockStore({
         user: {},
      })
      store.dispatch = jest.fn()
      render(
         <Provider store={store}>
            <SignInForm />
         </Provider>
      )

      userEvent.click(screen.getByText('Sign In With Google'))
      expect(store.dispatch).toHaveBeenCalledWith(googleSignInStart())
   })
})
