import { message, notification } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import config from '../config'

const Http = axios.create({
    baseURL: config('API_URL'),
    withCredentials: true,
})

const attachValidationErrors = (error) => {
    error.validationErrors = {}
    //Intercept Error
    if (error?.response?.status === 422) {
        const { errors } = error.response.data
        error.validationErrors = Object.keys(errors).reduce( (acm, field) => ({
            ...acm,
            [field]: {validateStatus: 'error', help: errors[field].join('\n')}
        }), {})
    }
    return error
}

const success = (response) => Promise.resolve(response.data)
const error = (error) => Promise.reject(attachValidationErrors(error))


Http.interceptors.response.use(success, error)

export const requestCookie = async () => {
    return Cookies.get('XSRF-TOKEN') || await Http.get('/csrf-cookie')
}

export const getErrorMessage = (error) => {
    if (error.response !== null) {
        const { status }  = error.response

        if (status === 422) {
            return error.response.data?.message
        } 

        if (status === 401) {
            return (error.response.data?.message || 'You are not authorized to perform this action');
        } 
        
        if (status === 404) {
            return ('Page not found')
        } 
    }
    return ('An unknown error occured')    
}

export const handleError = (error) => {
    return notification.error({
        message: 'Failed',
        description: getErrorMessage(error)
    })
}

export const sleep = (duration) => new Promise(resolve => setTimeout(resolve, duration))

export default Http