import { Link as RouterLink } from "react-router-dom"
import { Google } from "@mui/icons-material"
import { Grid, Typography, TextField, Button, Link } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"

export const RegisterPage = () => {
    return (

        <AuthLayout title="Register">

            <form>
                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Nombre completo" 
                            type="text" 
                            placeholder="Nombre Completo" 
                            fullWidth    
                            />
                    </Grid>                    
                    
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="correo" 
                            type="email" 
                            placeholder="correo@google.com" 
                            fullWidth    
                            />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="contraseña" 
                            type="password" 
                            placeholder="contraseña" 
                            fullWidth    
                            />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

                        <Grid item xs={ 12 } >
                            <Button variant="contained" fullWidth>
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
