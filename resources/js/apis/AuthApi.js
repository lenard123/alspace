import Http, { requestCookie } from '@/js/utils/Http'

export const register = async(formData) => {
    await requestCookie()
    return await Http.post('/register', formData)
}

export const login = async(formData) => {
    await requestCookie()
    return await Http.post('/login', formData)
}

export const logout = async() => {
    await requestCookie()
    return await Http.post('/logout')
}

export const fetchCurrentUser = async() => {
    await requestCookie()
    return await Http.get('/user')
}
