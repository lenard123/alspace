import { UserApi } from "@/js/apis";
import { useQuery } from "react-query";
import queryKeyFactory from "../queryKeyFactory";


export default function useAlumniWorksQuery(alumnus_id)
{
    return useQuery({
        queryKey: queryKeyFactory.alumniWorks(alumnus_id),
        queryFn: () => UserApi.fetchWorks(alumnus_id)
    })
}