import { updatePagination } from "@/js/utils/paginationReducer";
import { useQueryClient } from "react-query";
import queryKeyFactory from "../queryKeyFactory";


export default function useNotifications(filter)
{
    const key = queryKeyFactory.notifications(filter)
    const queryClient = useQueryClient()

    const getNotifications = () => queryClient.getQueryData(key)

    const setNotifications = (updater) => {
        if (typeof updater === 'function') {
            queryClient.setQueryData(key, updatePagination(updater))
        } else {
            queryClient.setQueryData(key, updater)
        }
    }

    const cancelNotificationsQuery = async () => {
        await queryClient.cancelQueries(key)
    }

    const invalidateNotifications = () => {
        queryClient.invalidateQueries(key)
    }

    return { 
        getNotifications, 
        setNotifications,
        cancelNotificationsQuery,
        invalidateNotifications
    }
}