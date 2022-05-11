import { NotificationApi } from "@/js/apis";
import { useMutation } from "react-query";
import useCurrentUserMutator from "./useCurrentUserMutator";


export default function useReadNotificationMutator()
{
    const { updateUnreadNotificationsCount } = useCurrentUserMutator()
    return useMutation(
        (id) => NotificationApi.markAsRead(id),
        {
            onSuccess(unread_count)
            {
                updateUnreadNotificationsCount(unread_count)
            }
        }
    )
}