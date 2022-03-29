import { useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import useApi from '@/js/hooks/useApi'
import { Spin } from 'antd'
import { AuthApi } from '@/js/apis'
import { useRecoilValue } from 'recoil'
import authState from '@/js/recoil/states/authState'
import useAuthActions from '@/js/recoil/actions/useAuthActions'

const Validating = () => (
    <div className='h-screen flex flex-col justify-center items-center'>
        <Spin />
        <span className='text-md'>Display some random tips while loading</span>
    </div>
)

const AuthGuard = () => {
    const { setCurrentUser } = useAuthActions()
    const { isLoading, execute, data:user, isSuccess } = useApi(AuthApi.fetchCurrentUser)
    const { currentUserId, isAuthenticated } = useRecoilValue(authState)
    const isValidated = !!currentUserId

    //OnMount
    useEffect(() => {
        //Revalidate if Authenticated but not validated
        if (isAuthenticated && !isValidated) {
            execute()
        }
    }, [])

    //On Success
    useEffect(() => {
        if (isSuccess) setCurrentUser(user)
    }, [isSuccess])

    if (isLoading) return <Validating />
    if (!isAuthenticated) return <Navigate to='/login' />
    if (isValidated) return <Outlet />
    return null
}

export default AuthGuard