import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDy_1cwxFNlBJk5beye1FC0ZoZ2oc_UiRU",
  authDomain: "laundry-app-411104.firebaseapp.com",
  projectId: "laundry-app-411104",
  storageBucket: "laundry-app-411104.appspot.com",
  messagingSenderId: "894856941369",
  appId: "1:894856941369:web:4c4b79a7bd222a9a50e2e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
