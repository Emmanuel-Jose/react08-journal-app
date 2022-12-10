import { Link as RouterLink } from "react-router-dom"
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [ ( value ) => value.includes('@') , 'El correo debe de tener una @' ],
    password: [ ( value ) => value.length >= 6 , 'El password debe de tener más de 6 letras' ],
    displayName: [ ( value ) => value.length >= 1 , 'El nombre es obligatorio' ],
}

export const RegisterPage = () => {

    const disptach = useDispatch();
    const [ formSubmitted, setFormSubmitted ] = useState( false );

    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking', [ status ] );

    const { 
        formState,
        displayName, 
        email, 
        password,  
        onInputChange,
        isFormValid, 
        displayNameValid,
        emailValid,
        passwordValid,
        } = useForm( formData, formValidations );

    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted( true );

        if ( !isFormValid ) return;

        // console.log( formState )
        disptach( startCreatingUserWithEmailPassword( formState ) );
    }

    return (

        <AuthLayout title="Register">

            <h1>FormValid { isFormValid ? 'Valido' : 'Incorrecto' }</h1>

            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Nombre completo" 
                            type="text" 
                            placeholder="Nombre Completo" 
                            fullWidth    
                            name="displayName"
                            value={ displayName }
                            onChange={ onInputChange }
                            error={ !!displayNameValid && formSubmitted } // doble !! para primero convertir a volor booleano null !null = true !!null = false --> false = no mostrar error
                            helperText={ displayNameValid }
                            />
                    </Grid>                    
                    
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="correo" 
                            type="email" 
                            placeholder="correo@google.com" 
                            fullWidth    
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted }
                            helperText={ emailValid }
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
                            error={ !!passwordValid && formSubmitted }
                            helperText={ passwordValid }
                        />
                    </Grid>

                    <Grid 
                        container
                        display={ !!errorMessage ? '' : 'none' }  
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

                        <Grid item xs={ 12 } >
                            <Button 
                                disabled={ isCheckingAuthentication }
                                variant="contained" 
                                fullWidth
                                type="submit"
                            >
                                Crear cuenta
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={ RouterLink } to='/auth/login'>
                            Ingresar
                        </Link>
                    </Grid>

                </Grid>
            </form>

        </AuthLayout>
    )
}
