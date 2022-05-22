import { NotificationApi } from "@/js/apis"
import { useMutation } from "react-query"
import useNotifications from "../hooks/useNotifications"
import useNotificationMutator from "../mutators/useNotificationMutator"

export default function useReadAllNotificationsAction(filter) 
{
    const { getNotifications, setNotifications, cancelNotificationsQuery, invalidateNotifications } = useNotifications(filter)
    const { markAllNotificationsAsRead, setUnreadNotificationsCount } = useNotificationMutator(filter)

    return useMutation(NotificationApi.markAllAsRead, {
        async onMutate() {
            await cancelNotificationsQuery()
            const previous = getNotifications()
            markAllNotificationsAsRead()
            return { previous }
        },

        onError(_error, _arg, context) {
            message.error('An error occured')
            setNotifications(context.previous)
        },

        onSuccess(unreadCount) {
            setUnreadNotificationsCount(unreadCount)
        },

        onSettled() {
            invalidateNotifications()
        }
    })
}