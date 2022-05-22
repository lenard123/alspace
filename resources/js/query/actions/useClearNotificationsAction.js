import { NotificationApi } from "@/js/apis"
import { useMutation } from "react-query"
import useNotifications from "../hooks/useNotifications"
import useNotificationMutator from "../mutators/useNotificationMutator"

export default function useClearNotificationsAction(filter) 
{
    const { getNotifications, setNotifications, cancelNotificationsQuery, invalidateNotifications } = useNotifications(filter)
    const { clearNotifications } = useNotificationMutator(filter)

    return useMutation(NotificationApi.clearNotifications, {
        async onMutate() {

            await cancelNotificationsQuery()

            const previous = getNotifications()

            clearNotifications()

            return { previous }
        },

        onError(_error, _arg, context) {
            //Rollback previous state incase of error
            message.error('An error occured')
            setNotifications(context.previous)
        },

        onSettled() {
            invalidateNotifications()
        }
    })
}