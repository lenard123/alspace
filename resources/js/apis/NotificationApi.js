import { notification } from "antd"
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

export const markAsRead = async (notification_id) => {
    await requestCookie()
    return await Http.patch(`/notifications/${notification_id}/read_at`)
}

