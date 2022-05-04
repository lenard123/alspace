import { useQuery } from "react-query";
import { UserApi } from "../apis";
import queryKeyFactory from "./queryKeyFactory";


export default function useUserQuery(userId) {
    return useQuery({
        queryKey: queryKeyFactory.user(userId),
        queryFn: () => UserApi.fetchUser(userId),        
    })
}