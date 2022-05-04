import { useInfiniteQuery } from "react-query";
import { UserApi } from "../../apis";
import queryKeyFactory from "../queryKeyFactory";


export default function useUserPostsQuery(userId) {
    return useInfiniteQuery({
        queryKey: queryKeyFactory.userPosts(userId),
        queryFn: ({ pageParam }) => UserApi.fetchUserPosts(userId, pageParam),
        getNextPageParam: (lastPage) => {
            if (lastPage.current_page < lastPage.last_page) {
                return lastPage.current_page + 1
            }
            return undefined
        },
        select: ({ pages }) => {
            return pages.map(page => {
                return page.data
            }).flat()
        }
    })
}