import { UserApi } from "@/js/apis";
import { useQuery } from "react-query";
import queryKeyFactory from "../queryKeyFactory";


export default function useAlumniQuery(filter)
{
    return useQuery({
        queryKey: queryKeyFactory.alumniUsers(filter),
        queryFn: () => UserApi.fetchAlumni(filter),
        keepPreviousData: true,
    })
}