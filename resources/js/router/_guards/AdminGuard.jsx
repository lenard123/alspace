import PageLoading from "@/js/components/PageLoading";
import useCurrentUserQuery from "@/js/queries/useCurrentUserQuery";
import { Navigate, Outlet } from "react-router-dom";


export default function AdminGuard() {
    const {  data:currentUser, isLoading } = useCurrentUserQuery()
    const isLoggedIn = currentUser !== null
    const isAdmin = currentUser?.is_admin

    if (isLoading) {
        return <PageLoading />        
    }

    if (!isLoggedIn || !isAdmin) {
        return <Navigate to='/admin/login' />
    } else {
        return <Outlet />
    }

    return null
}