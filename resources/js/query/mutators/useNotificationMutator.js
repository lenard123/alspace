import { updatePagination } from "@/js/utils/paginationReducer"
import moment from "moment"
import { useQueryClient } from "react-query"
import useNotifications from "../hooks/useNotifications"
import queryKeyFactory from "../queryKeyFactory"
import useCurrentUserMutator from "./useCurrentUserMutator"
import _ from 'lodash'

export default function useNotificationMutator(filter)
{
    const { setNotifications } = useNotifications(filter)
    const { setCurrentUser } = useCurrentUserMutator()

    const clearNotifications = () => {
        setNotifications(undefined)
    }

    const setUnreadNotificationsCount = (unread_notifications_count) => {
        setCurrentUser(user => _.merge(user, {unread_notifications_count}))
    }

    const markAllNotificationsAsRead = () => {
        const read_at = moment()        
        setNotifications(old => _.merge(old, {read_at}))
    }

    return {
        clearNotifications,
        setUnreadNotificationsCount,
        markAllNotificationsAsRead
    }
}