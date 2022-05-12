import moment from "moment"
import Http, { requestCookie } from "../utils/Http"

export const addWorkExperience = async (data) => {
    await requestCookie()
    return await Http.post('/works', {
        ...data,
        start_at: data.start_at.format('YYYY-MM-DD'),
        end_at: data.end_at?.format('YYYY-MM-DD')
    })
}