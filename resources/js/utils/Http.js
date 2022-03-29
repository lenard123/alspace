import axios from 'axios'
import Cookies from 'js-cookie'
import config from '../config'

const Http = axios.create({
    baseURL: config('API_URL')
})

Http.defaults.withCredentials = true

export const requestCookie = async () => {
    return Cookies.get('XSRF-TOKEN') || await Http.get('/csrf-cookie')
}

export const sleep = (duration) => new Promise(resolve => setTimeout(resolve, duration))

export default Http