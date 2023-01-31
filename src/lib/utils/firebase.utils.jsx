import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAZkmmU-KjEGX1XijejLusvzz-UQ37Lh1I",
  authDomain: "e-clothing-cffad.firebaseapp.com",
  projectId: "e-clothing-cffad",
  storageBucket: "e-clothing-cffad.appspot.com",
  messagingSenderId: "454669562842",
  appId: "1:454669562842:web:cb68c266920ba8b85646e3"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);