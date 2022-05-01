import { useMutation } from 'react-query'
import { useState } from 'react'
import { AuthApi } from '@/js/apis'
import _ from 'lodash'

const useFormValidator = (step, onFinish) => {
    const [validated, setValidated] = useState()
    const [validationErrors, setValidationErrors] = useState({})
    const { isLoading, mutate } = useMutation((data) => AuthApi.registerValidate(data, step), {
        onSuccess(data) {
            setValidationErrors({})
            setValidated(data)
            onFinish(data)
        },
        onError(error) {
            setValidationErrors(error.validationErrors || {})
        }
    })

    const validate = (data) => {
        if (_.isEqual(data, validated)) {
            return onFinish(data)
        }

        setValidationErrors({})
        mutate(data)
    }

    return { validationErrors, isLoading, validate }
}

export default useFormValidator