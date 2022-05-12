import { NotificationApi } from "@/js/apis"
import { useMutation, useQueryClient } from "react-query"
import queryKeyFactory from "../queryKeyFactory"

export default function useClearNotificationsAction(filter) {

    const queryClient = useQueryClient()
    const queryKey = queryKeyFactory.notifications(filter)

    return useMutation(NotificationApi.clearNotifications, {
        async onMutate() {

            await queryClient.cancelQueries(queryKey)

            const previous = queryClient.getQueryData(queryKey)

            queryClient.setQueryData(queryKey, undefined)

            return { previous }
        },

        onError(_error, _arg, context) {
            message.error('An error occured')
            queryClient.setQueryData(queryKey, context.previous)
        },

        onSettled() {
            queryClient.invalidateQueries(queryKey)
        }
    })
}