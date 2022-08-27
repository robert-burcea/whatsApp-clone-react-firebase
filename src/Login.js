import React from 'react'
import './Login.css'
import { GoogleButton } from 'react-google-button'
import { app } from './firebase'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    useUser, useSetUser
} from './UserContext'

function Login({setDataReady}) {
    const user = useUser();
    const changeUser = useSetUser();

    const signIn = () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            changeUser({...result.user})
            setDataReady(true);
            console.log(result)
            console.log(result.user.photoURL)
        })
        .catch(err => alert(err.message))
    }
  return (
    <div>
        <GoogleButton 
            onClick={signIn}
        />
    </div>
  )
}

export default Login
