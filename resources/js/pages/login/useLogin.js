import { login } from "@/js/apis/AuthApi"
import { useMutation, useQueryClient } from "react-query"
import { useState } from 'react'
import { message } from "antd"
import { successMessage } from "@/js/utils"

const useLogin = () => {

    const [remember, setRemember] = useState(false)
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
            successMessage('Successfully Login')
            queryClient.setQueryData(['users', 'current'], data)
        }
    })

    const handleSubmit = (formData) => {
        if (mutation.isLoading) return;
        mutation.mutate({remember, ...formData})
    }

    return {
        ...mutation,
        validationErrors,
        handleSubmit,
        remember,
        setRemember
    }
}

export default useLogin