import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async() => {
    
    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider )
        // obtener token que se puede verificar del lado de google
        // const credentials = GoogleAuthProvider.credentialFromResult( result )

        const { displayName, email, photoURL, uid } = result.user //obtener los datos del usuario de google

        return {
            ok: true,
            // user info
            displayName,
            email,
            photoURL,
            uid
        }


        
    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }

    }

}


export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {

        // Firebase function
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        //Actualizar el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }

        
    } catch ( error ) {
        
        return { ok: false, errorMessage: error.message }

    }

}


export const loginWithEmailPassword = async({ email, password }) => {

    try {

        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { displayName, photoURL, uid } = resp.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        }
        
    } catch ( error ) {
        
        console.log( error )
        return { ok: false, errorMessage: error.message }

    }

}

export const logoutFirebase = async() => {

    // si estas loggeado con google, twitter, github, etc. Esto hace el logout de todo
    return await FirebaseAuth.signOut();

}