import { useEffect } from 'react'
import { AuthApi } from "@/js/apis"
import useApi from "@/js/hooks/useApi"
import useAuthActions from '@/js/recoil/actions/useAuthActions'
import useSetTitle from '@/js/hooks/useSetTitle'

export default function() {
    useSetTitle('Login')
    const { setAuthenticated } = useAuthActions()
    const { validationErrors, isLoading, execute, status, message, navigate } = useApi(AuthApi.login)

    useEffect(() => {
        if (status === 'success') {
            message.success('Successfully Login')
            setAuthenticated()
            navigate('/')
        }
    },[status])

    return {
        validationErrors,
        isLoading,
        handleSubmit: execute
    }
}