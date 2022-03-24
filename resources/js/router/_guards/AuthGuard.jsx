import { useEffect } from 'react'
import { useAuthState } from "@/js/states"
import { Navigate, Outlet } from "react-router-dom"
import useApi from '@/js/hooks/useApi'
import { Spin } from 'antd'
import Logo from '@/js/components/Logo'
import { AuthApi } from '@/js/apis'

const Validating = () => (
    <div className='h-screen flex flex-col justify-center items-center'>
        <Spin />
        <span className='text-md'>Display some random tips while loading</span>
    </div>
)

const AuthGuard = () => {
    const { isAuthenticated, isValidated, dispatch } = useAuthState()
    const { isLoading, execute, status, data:user } = useApi(AuthApi.fetchCurrentUser)

    useEffect(() => {
        if (status == 'success') {
            dispatch('SET_USER', {user})
        }
    }, [status])

    useEffect(() => {
        if (isAuthenticated && !isValidated) {
            execute()
        }
    }, [])

    if (isLoading) {
        return <Validating />
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (isValidated) {
        return <Outlet />
    }

    return null
}

export default AuthGuard