import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA4g3RleE8KkdZPLxjnTICe1TnhjBZjw38",
  authDomain: "laundry-application-b7713.firebaseapp.com",
  projectId: "laundry-application-b7713",
  storageBucket: "laundry-application-b7713.appspot.com",
  messagingSenderId: "142431128284",
  appId: "1:142431128284:web:0478106da2816efbd18219",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { auth, db };
