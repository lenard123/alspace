import useReadNotificationMutator from "../mutators/useReadNotificationMutator"


export default function useNotificationAction()
{

    const { mutate } = useReadNotificationMutator()

    return {
        readNotification(notification) {
            if (notification == null) return;

            //has already read
            if (notification.read_at !== null) return;

            mutate(notification.id)
        }
    }
}