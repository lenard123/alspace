import { useQuery } from "react-query";
import { UserApi } from "../../apis";
import queryKeyFactory from "../queryKeyFactory";


export default function usePendingUsersQuery(page = 1)
{
    return useQuery({
        queryKey: queryKeyFactory.pendingUsers(page),
        queryFn: () => UserApi.fetchPendingUsers(page),
        keepPreviousData: true
    })
}