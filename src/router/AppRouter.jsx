import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"

export const AppRouter = () => {
    return (

        <Routes>

            {/* login y registro */}
            <Route path="/auth/*" element={ <AuthRoutes /> } /> {/** cualquier elemento que entre por auth mostrar element */}

            {/* JournalApp */}
            <Route path="/*" element={ <JournalRoutes /> } />

        </Routes>

    )
}
