import { isAuthenticatedState } from "@/js/states/useAuthState"
import { Navigate, Outlet } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default () => {
    const isAuthenticated = useRecoilValue(isAuthenticatedState)

    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return <Outlet />
}