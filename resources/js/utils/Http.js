import axios from 'axios'
import Cookies from 'js-cookie'
import config from '../config'

const Http = axios.create({
    baseURL: config('API_URL'),
    withCredentials: true,
})

const attachValidationErrors = (error) => {
    let validationErrors = {}
    if (error?.response.status === 422) {
        const errors = error.response.data.errors
        validationErrors = Object.keys(errors).reduce( (acm, field) => ({
            ...acm,
            [field]: {validateStatus: 'error', help: errors[field].join('\n')}
        }), {})
    }
    return {
        ...error,
        validationErrors
    }    
}

const success = (response) => Promise.resolve(response.data)
const error = (error) => Promise.reject(attachValidationErrors(error))


Http.interceptors.response.use(success, error)

export const requestCookie = async () => {
    return Cookies.get('XSRF-TOKEN') || await Http.get('/csrf-cookie')
}

export const sleep = (duration) => new Promise(resolve => setTimeout(resolve, duration))

export default Http