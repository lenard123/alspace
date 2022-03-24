import axios from 'axios'
import Cookies from 'js-cookie'

const Http = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
})

Http.defaults.withCredentials = true

export const requestCookie = async () => {
    return Cookies.get('XSRF-TOKEN') || await Http.get('/csrf-cookie')
}

export const sleep = (duration) => new Promise(resolve => setTimeout(resolve, duration))

export default Http