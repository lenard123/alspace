import { useState, useEffect, useCallback } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import useAuthActions from '../recoil/actions/useAuthActions'

const STATUS_IDLE = 'idle'
const STATUS_LOADING = 'loading'
const STATUS_ERROR = 'error'
const STATUS_SUCCESS = 'success'

const defaultConfig = {
    params: [],
    executeOnMount: false
}

const mapValidationErrors = (validationErrors) => {
    return Object.keys(validationErrors).reduce( (acm, field) => {
        return {...acm, [field]: {
            validateStatus: 'error',
            help: validationErrors[field].join(',')
        }}
    }, {})
}

const useApi = function(promise, config) {
    const navigate = useNavigate()
    const { params, executeOnMount } = {...defaultConfig, ...config}
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)   
    const [status, setStatus] = useState(STATUS_IDLE)
    const isLoading = status === STATUS_LOADING
    const isError = status === STATUS_ERROR
    const isSuccess = status === STATUS_SUCCESS
    const [validationErrors, setValidationErrors] = useState({})
    const { removeCurrentUser } = useAuthActions()
    
    const execute = async(...params) => {
        try {
            setValidationErrors({})
            setStatus(STATUS_LOADING)
            const response = await promise(...params)
            setData(response.data)
            setStatus(STATUS_SUCCESS)
        } catch (error) {
            setError(error)
            setStatus(STATUS_ERROR)

            //Global Handler :))
            if (error?.message == 'Network Error') {
                message.error('An error occured: Please Check your internet connection.');
            } else if (error?.response?.status >= 500) {
                message.error('Something wrong happened in our server. Please coordinate with an admin');
            } else if (error?.response?.status === 401) {
                removeCurrentUser()
                message.error('Session expired: You need to login again')
                navigate('/login')
            } else if (error?.response?.status === 422) {
                setValidationErrors(mapValidationErrors(error.response.data.errors))
            }

        }
    }

    //On Mount
    useEffect(() => {
        if (executeOnMount) {
            execute(...params)
        }
    }, [])

    return {
        validationErrors, execute, data, error, isLoading, isError, isSuccess, status, message, navigate
    }

}

export default useApi