import PageLoading from "@/js/components/PageLoading";
import useCurrentUserQuery, { useCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import { Navigate, Outlet } from "react-router-dom";


export default function AuthGuard() {
    const {  data:currentUser, isLoading } = useCurrentUserQuery()

    if (isLoading) {
        return <PageLoading />        
    }

    if (!currentUser) {
        return <Navigate to='/login' />
    }

    return <Outlet />
    
}