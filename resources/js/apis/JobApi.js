import Http, { requestCookie } from "../utils/Http"

export const fetchJobs = async () => {
    await requestCookie()
    return await Http.get('/jobs')
}

export const postJob = async (data) => {
    await requestCookie()
    return await Http.post('/jobs', data)
}