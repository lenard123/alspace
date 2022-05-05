import { UserApi } from "@/js/apis";
import { useQuery } from "react-query";
import queryKeyFactory from "../queryKeyFactory";


export default function useAlumniQuery(page = 1)
{
    return useQuery({
        queryKey: queryKeyFactory.alumniUsers(page),
        queryFn: () => UserApi.fetchAlumni(page),
        keepPreviousData: true,
    })
}