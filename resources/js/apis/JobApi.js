import Http, { requestCookie } from "../utils/Http"

export const fetchJobs = async () => {
    await requestCookie()
    return await Http.get('/jobs')
}