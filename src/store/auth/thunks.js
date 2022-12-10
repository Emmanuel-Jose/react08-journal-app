import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {

    return async( disptach ) => {

        disptach( checkingCredentials() ) // put state in checking

    }

}

export const startGoogleSignIn = () => {

    return async( disptach ) => {

        disptach( checkingCredentials() )

        const result = await signInWithGoogle()
        if ( !result.ok ) return disptach( logout( result.errorMessage ) )

        disptach( login( result ) )


    }

}


export const startCreatingUserWithEmailPassword = ( { email, password, displayName } ) => {

    return async( disptach ) => {

        disptach( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword( { email, password, displayName } );
        
        // si el ok esta en false, hacer logout porque la peticion dio un error
        if( !ok ) return disptach( logout({ errorMessage }) )

        // si todo sale bien logear al usuario
        disptach( login({ uid, displayName, email, photoURL }) )

    }

}


export const startLoginWithEmailPassword = ({ email, password }) => {

    return async( disptach ) => {

        disptach( checkingCredentials() );
        const { ok, displayName, photoURL, uid, errorMessage } = await loginWithEmailPassword({ email, password });

        // logout si algo salio mal en la peticion
        if( !ok ) return disptach( logout({ errorMessage }) );

        // si todo sale bien hacer el login de nuestro authSlice
        disptach( login({ uid, displayName, email, photoURL }) );

    }

}


export const startLogout = () => {

    return async( disptach ) => {

        logoutFirebase();

        disptach( logout({ }) );

    }

}