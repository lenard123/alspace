import { useQuery } from "react-query";
import { ThreadApi } from "../apis";
import queryKeyFactory from "./queryKeyFactory";

export default function useSupportThreadsQuery()
{
    return useQuery({
        queryKey: queryKeyFactory.supportThreads,
        queryFn: ThreadApi.fetchSupportThreads
    })
}