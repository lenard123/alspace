import axios from 'axios'
import Cookies from 'js-cookie'
import config from '../config'

const Http = axios.create({
    baseURL: config('API_URL'),
    withCredentials: true,
})



Http.interceptors.response.use(undefined, (error) => {
    let validationErrors = {}
    if (error?.response.status === 422) {
        const errors = error.response.data.errors
        validationErrors = Object.keys(errors).reduce( (acm, field) => ({
            ...acm,
            [field]: {validateStatus: 'error', help: errors[field].join('\n')}
        }), {})
    }

    return Promise.reject({...error, validationErrors})
})

export const requestCookie = async () => {
    return Cookies.get('XSRF-TOKEN') || await Http.get('/csrf-cookie')
}

export const sleep = (duration) => new Promise(resolve => setTimeout(resolve, duration))

export default Http