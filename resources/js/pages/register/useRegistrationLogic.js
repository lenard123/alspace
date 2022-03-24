import { useEffect } from 'react'
import useApi from "@/js/hooks/useApi";
import { AuthApi } from "@/js/apis";

export default function()
{
    const { 
        isLoading, 
        execute, 
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

    const register = (formData) => {
        execute({...formData, year_graduated: formData.year_graduated.year()})
    }

    return {
        isLoading,
        register,
        validationErrors
    }
}