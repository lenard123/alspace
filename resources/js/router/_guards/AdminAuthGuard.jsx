import PageLoading from "@/js/components/PageLoading";
import useCurrentUserQuery from "@/js/query/useCurrentUserQuery";
import { Navigate, Outlet } from "react-router-dom";


export default function AdminAuthGuard() {
    const {  data:currentUser, isLoading } = useCurrentUserQuery()
    const isAdmin = currentUser?.is_admin

    if (isLoading) {
        return <PageLoading />        
    }

    if (!isAdmin) {
        return <Navigate to='/admin/login' />
    } 

    return <Outlet />
}