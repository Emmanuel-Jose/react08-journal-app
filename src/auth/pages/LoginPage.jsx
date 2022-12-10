import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { Google } from "@mui/icons-material"

import { AuthLayout } from "../layout/AuthLayout"

import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"
import { useForm } from "../../hooks"

export const LoginPage = () => {

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector( state => state.auth );

    const { email, password, onInputChange } = useForm({
        email: 'jose@email.com',
        password: '1234'
    });

    // memorizar si el usuario esta authenticado
    // si status === 'checking' regresa True, y la dependencia va a ser el estatus
    // cada vez que haces click en los botones de login o google, cambia a checking y ya no deja 
    // presionarlos más
    const isAuthenticating = useMemo( () => status === 'checking', [ status ])

    const onSubmit = ( event ) => {
        event.preventDefault()
        // console.log({ email, password })
        dispatch( startLoginWithEmailPassword({ email, password }) )
    }

    const onGoogleSignIn = () => {
        console.log( 'onGoogleSignIn' )
        dispatch( startGoogleSignIn() )
    }

    return (

        <AuthLayout title="Login">
            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="correo" 
                            type="email" 
                            placeholder="correo@google.com" 
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ onInputChange }    
                            />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="contraseña" 
                            type="password" 
                            placeholder="contraseña" 
                            fullWidth
                            name="password"
                            value={ password }
                            onChange={ onInputChange }     
                            />
                    </Grid>

                    <Grid 
                        container
                        display={ !!errorMessage ? '' : 'none' }
                        sx={{ mt: 1 }}  
                    >
                        <Grid 
                            item 
                            xs={ 12 } 
                            // si no hay error se pone '' si hay none  
                        >
                            <Alert severity="error">{ errorMessage }</Alert>
                        </Grid>

                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                fullWidth
                                disabled={ isAuthenticating }
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                onClick={ onGoogleSignIn } 
                                variant="contained" 
                                fullWidth
                                disabled={ isAuthenticating }
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>


                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={ RouterLink } to='/auth/register'>
                            Crear una cuenta
                        </Link>
                    </Grid>

                </Grid>
            </form>

        </AuthLayout>
    )
}
