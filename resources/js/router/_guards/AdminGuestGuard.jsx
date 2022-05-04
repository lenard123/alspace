import { useCurrentUser } from "@/js/query/useCurrentUserQuery"
import { Navigate, Outlet } from "react-router-dom"

export default function AdminGuestGuard()
{
    const currentUser = useCurrentUser()

    if (currentUser?.is_admin) {
        return <Navigate to='/admin' />
    }

    return <Outlet />
}