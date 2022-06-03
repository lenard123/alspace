import { useMutation, useQueryClient } from "react-query"
import { useState } from 'react'
import { message } from "antd"
import { AuthApi } from "@/js/apis"
import { successMessage } from "@/js/utils"

const useRegister = () => {
    const [validationErrors, setValidationErrors] = useState({})
    const queryClient = useQueryClient()
    const mutation = useMutation(AuthApi.register,{
        retry: 0,
        onMutate: () => {
            setValidationErrors({})
        },
        onError: (error) => {
            setValidationErrors(error.validationErrors)
        },
        onSuccess: (data) => {
            successMessage('Successfully Registered')
            queryClient.setQueryData(['users', 'current'], data)
        }
    })

    const register = ({year_graduated, ...formData}) => {
        if (mutation.isLoading) return;
        mutation.mutate({
            ...formData,
            year_graduated: year_graduated.year()
        })
    }

    return {
        ...mutation,
        register,
        validationErrors
    }
}

export default useRegister