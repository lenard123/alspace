import { useEffect } from 'react'
import { AuthApi } from "@/js/apis"
import useApi from "@/js/hooks/useApi"
import { useAuthState } from '@/js/states'

export default function() {

    const {dispatch} = useAuthState()
    const { validationErrors, isLoading, execute, status, message, navigate } = useApi(AuthApi.login)

    useEffect(() => {
        if (status === 'success') {
            message.success('Successfully Login')
            dispatch('SET_AUTHENTICATED', { isAuthenticated: true })
            navigate('/')
        }
    },[status])

    return {
        validationErrors,
        isLoading,
        handleSubmit: execute
    }
}