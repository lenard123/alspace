import Http, { requestCookie } from "../utils/Http"

export const addWorkExperience = async (data) => {
    await requestCookie()
    return await Http.post('/works', data)
}