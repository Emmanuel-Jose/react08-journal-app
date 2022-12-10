import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../firebase/config"
import { login, logout } from "../store/auth"

export const useCheckAuth = () => {

    const disptach = useDispatch()
    const { status } = useSelector( state => state.auth )

    useEffect(() => {
    
        /**onAuthStateChanged es una funcion que regresa un funcion Observable
         * observable es solo una funciones que emite valores, cuando el estado de la autenticacion cambie
         * está funcion se va a volver a disparar
         */
        onAuthStateChanged( FirebaseAuth, async( user ) => {
            // console.log( user )
            if ( !user ) return disptach( logout() );

            // si tengo un usuario hago el login
            const { uid, email, displayName, photoURL } = user;
            disptach( login({ uid, email, displayName, photoURL }) )
        } )

    }, [  ])

    return status

}
