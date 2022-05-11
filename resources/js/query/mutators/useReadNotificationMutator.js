import { NotificationApi } from "@/js/apis";
import { useMutation } from "react-query";


export default function useReadNotificationMutator()
{
    return useMutation(
        (id) => NotificationApi.markAsRead(id),
        {
            onSettled(data) {
                console.log(data)
            }
        }
    )
}