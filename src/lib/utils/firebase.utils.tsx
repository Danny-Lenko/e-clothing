import { initializeApp } from 'firebase/app'
import {
   getAuth,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
   NextOrObserver,
   User,
} from 'firebase/auth'
import {
   getFirestore,
   doc,
   getDoc,
   setDoc,
   collection,
   writeBatch,
   query,
   getDocs,
   QueryDocumentSnapshot,
} from 'firebase/firestore'
import { Category } from '../store/categories/categories.types'
import { UserData } from '../store/user/user.types'

const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
   prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export type ObjectToAdd = {
   title: string
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
   collectionKey: string,
   objectsToAdd: T[]
) => {
   const batch = writeBatch(db)
   const collectionRef = collection(db, collectionKey)

   objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase())
      batch.set(docRef, object)
   })

   await batch.commit()
   console.log('done')
}

export const getCategoriesAndDocuments = async () => {
   const collectionRef = collection(db, 'categories')
   const q = query(collectionRef)

   const querySnapshot = await getDocs(q)
   return querySnapshot.docs.map((doc) => doc.data()) as Category[]
}

export type AdditionalData = {
   displayName?: string
}

export const createUserDocumentFromAuth = async (
   userAuth: User,
   additionalData: AdditionalData = {} as AdditionalData
): Promise<QueryDocumentSnapshot<UserData> | void> => {
   if (!userAuth) return

   const userDocRef = doc(db, 'users', userAuth.uid)
   const userSnapshot = await getDoc(userDocRef)

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth
      const createdAt = new Date()

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalData,
         })
      } catch (error) {
         console.log('error creating the user', error)
      }
   }

   return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const createAuthUserWithEmailAndPassword = async (
   email: string,
   password: string
) => {
   if (!email || !password) return

   return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInUserWithEmailAndPassword = async (
   email: string,
   password: string
) => {
   if (!email || !password) return

   return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
   onAuthStateChanged(auth, callback)

export const getCurrentUser = (): Promise<User | null> => {
   return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
         auth,
         (userAuth) => {
            unsubscribe()
            resolve(userAuth)
         },
         reject
      )
   })
}
