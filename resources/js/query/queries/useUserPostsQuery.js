import { useInfiniteQuery } from "react-query";
import { UserApi } from "../../apis";
import queryKeyFactory from "../queryKeyFactory";
import { paginationDataReducer } from "../ReactQueryProvider";


export default function useUserPostsQuery(userId) {
    return useInfiniteQuery({
        queryKey: queryKeyFactory.userPosts(userId),
        queryFn: ({ pageParam }) => UserApi.fetchUserPosts(userId, pageParam),
        select: paginationDataReducer
    })
}