import { NotificationApi } from "@/js/apis";
import { useInfiniteQuery } from "react-query";
import queryKeyFactory from "../queryKeyFactory";
import { paginationDataReducer } from "../ReactQueryProvider";


export default function useNotificationsQuery(filter = null)
{
    return useInfiniteQuery({
        queryKey: queryKeyFactory.notifications(filter),
        queryFn: ({pageParam}) => NotificationApi.fetchNotifications(filter, pageParam),
        select: paginationDataReducer
    })
}