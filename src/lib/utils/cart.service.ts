import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './firebase.utils'
import { ICartItem } from '../store/cart/cart.slice'

export const cartService = {
   async saveCart(userId: string, cartItems: ICartItem[]) {
      console.log('USER ID:', userId)
      console.log('CART ITEMS SAVE:', cartItems)
      const cartRef = doc(db, 'carts', userId)
      await setDoc(cartRef, { items: cartItems }, { merge: true })
   },

   async getCart(userId: string) {
      const cartRef = doc(db, 'carts', userId)
      const cartDoc = await getDoc(cartRef)
      return cartDoc.exists() ? cartDoc.data().items : []
   },
}
