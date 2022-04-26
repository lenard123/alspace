import PageLoading from "@/js/components/PageLoading";
import useCurrentUserQuery, { useCurrentUser } from "@/js/queries/useCurrentUserQuery";
import { Navigate, Outlet } from "react-router-dom";


export default function AuthGuard() {
    const {  data:currentUser, isLoading } = useCurrentUserQuery()
    const isLoggedIn = currentUser !== null

    if (isLoading) {
        return <PageLoading />        
    }

    if (!isLoggedIn) {
        return <Navigate to='/login' />
    } else {
        return <Outlet />
    }

    return null
}