// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, collection
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDody3uLhZ3rFx1BsTTgDx4pbZrhl_coSY",
    authDomain: "whats-app-clone-e279c.firebaseapp.com",
    projectId: "whats-app-clone-e279c",
    storageBucket: "whats-app-clone-e279c.appspot.com",
    messagingSenderId: "37017787170",
    appId: "1:37017787170:web:bf3f69c33cee38f9b8e37b",
    measurementId: "G-YRTEML2W45"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

 export { app }
 export default db;