import { useInfiniteQuery, useQuery } from "react-query";
import { UserApi } from "../apis";
import queryKeyFactory from "./queryKeyFactory";


export default function usePendingUsersQuery(page = 1)
{
    return useQuery({
        queryKey: queryKeyFactory.pendingUsers(page),
        queryFn: () => UserApi.fetchPendingUsers(page),
        select: (data) => {
            return data.data
        }
    })
    // return useInfiniteQuery({
    //     queryKey: queryKeyFactory.pendingUsers,
    //     queryFn: ({ pageParam }) => UserApi.fetchPendingUsers(pageParam),
    //     select: ({ pages }) => {
    //         return pages.map(page => {
    //             return page.data
    //         }).flat()
    //     },
    //     getNextPageParam: (lastPage) => {
    //         if (lastPage.current_page < lastPage.last_page) {
    //             return lastPage.current_page + 1
    //         }
    //         return undefined
    //     }
    // })
}