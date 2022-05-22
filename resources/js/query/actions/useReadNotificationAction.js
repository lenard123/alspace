import { NotificationApi } from "@/js/apis";
import { useMutation } from "react-query";
import useNotificationMutator from "../mutators/useNotificationMutator";


export default function useReadNotificationAction() {
    const { setUnreadNotificationsCount } = useNotificationMutator()
    return useMutation(NotificationApi.markAsRead, {
        onSuccess(unread_count) {
            setUnreadNotificationsCount(unread_count)
        }
    })
}