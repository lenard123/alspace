import Http, { requestCookie } from "../utils/Http"


export const fetchNotifications = async (filter = null, page = 1) => {
    await requestCookie()
    return await Http.get('/notifications', {
        params: {
            filter,
            page
        }
    })
}

