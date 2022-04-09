import { login } from "@/js/apis/AuthApi"
import { useMutation, useQueryClient } from "react-query"
import { useState } from 'react'
import { message } from "antd"

const useLogin = () => {

    const [validationErrors, setValidationErrors] = useState({})
    const queryClient = useQueryClient()

    const mutation = useMutation(login, {
        retry: 0,
        onMutate: () => {
            setValidationErrors({})
        },
        onError: (error) => {
            setValidationErrors(error.validationErrors)
        },
        onSuccess: (data) => {
            message.success('Successfully Login')
            queryClient.setQueryData(['users', 'current'], data)
        }
    })

    const handleSubmit = (formData) => {
        if (mutation.isLoading) return;
        mutation.mutate(formData)
    }

    return {
        ...mutation,
        validationErrors,
        handleSubmit
    }
}

export default useLogin