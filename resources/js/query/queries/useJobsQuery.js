import { JobApi } from "@/js/apis";
import { useQuery } from "react-query";
import queryKeyFactory from "../queryKeyFactory";

export default function useJobsQuery()
{
    return useQuery({
        queryKey: queryKeyFactory.jobs,
        queryFn: JobApi.fetchJobs
    })
}