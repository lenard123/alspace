import { useCurrentUser } from "@/js/queries/useCurrentUserQuery";
import { Navigate, Outlet } from "react-router-dom";



export default function AuthGuard() {
    const currentUser = useCurrentUser()
    const isLoggedIn = currentUser !== null

    if (isLoggedIn) {
        return <Navigate to='/' />
    }

    return <Outlet />
}