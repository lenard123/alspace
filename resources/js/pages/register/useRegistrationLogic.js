import { useEffect } from 'react'
import useApi from "@/js/hooks/useApi";
import { AuthApi } from "@/js/apis";

export default function()
{
    const { 
        isLoading, 
        execute:register, 
        status, 
        isSuccess, 
        navigate,
        message,
        validationErrors
    } = useApi(AuthApi.register);

    useEffect(() => {
        if (isSuccess) {
            message.success('Account created successfully')
            navigate('/login')
        }
    }, [status])

    return {
        isLoading,
        register,
        validationErrors
    }
}