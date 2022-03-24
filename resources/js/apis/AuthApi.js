import Http, { requestCookie } from '@/js/utils/Http'

export const register = async(formData) => {
    return await Http.post('/register', formData)
}

export default {
    register
}