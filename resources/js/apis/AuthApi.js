import Http, { requestCookie } from '@/js/utils/Http'

export const register = async(formData) => {
    await requestCookie()
    return await Http.post('/register', formData)
}

export const registerValidate = async(formData, step = 0) => {
    await requestCookie()
    return await Http.post(`/register-validator?step=${step}`, formData)
}

export const sendOTP = async(email) => {
    await requestCookie()
    return await Http.post('/register-validator/send-otp', { email })
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

export const forgotPassword = async(email) => {
    await requestCookie()
    return await Http.post('/forgot-password', { email })
}

export const resetPassword = async({ email, password, password_confirmation, token }) => {
    await requestCookie()
    return await Http.post('/reset-password', { email, password, password_confirmation, token })
}