import { useCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import { Navigate, Outlet } from "react-router-dom";



export default function AuthGuard() {
    const currentUser = useCurrentUser()
    const isLoggedIn = currentUser !== null

    if (isLoggedIn) {
        return <Navigate to='/home' />
    }

    return <Outlet />
}