import authState from "@/js/recoil/states/authState"
import { Navigate, Outlet } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default function GuestGuard(){
    const { isAuthenticated } = useRecoilValue(authState)

    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return <Outlet />
}