import { NotificationApi } from "@/js/apis";
import { useMutation } from "react-query";
import useCurrentUserMutator from "../mutators/useCurrentUserMutator";


export default function useReadNotificationAction()
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