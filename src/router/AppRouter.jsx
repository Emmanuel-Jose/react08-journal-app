import { Navigate, Route, Routes } from "react-router-dom"

import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui/components/CheckingAuth"
import { useCheckAuth } from "../hooks"

export const AppRouter = () => {

    const status = useCheckAuth();

    if( status === 'checking' ) {
        return <CheckingAuth />
    }

    return (

        <Routes>

            {
                ( status === 'authenticated' )
                    ? <Route path="/*" element={ <JournalRoutes /> } />
                    : <Route path="/auth/*" element={ <AuthRoutes /> } />
            }

            <Route path="/*" element={ <Navigate to='/auth/login'/> } />

            {/* login y registro */}
            {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> * cualquier elemento que entre por auth mostrar element */}

            {/* JournalApp */}
            {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

        </Routes>

    )
}
