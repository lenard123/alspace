import { useQuery } from "react-query"
import { fetchPost } from "../apis/PostApi"
import queryKeyFactory from "./queryKeyFactory"


const usePostQuery =  (id) => {
    return useQuery({
        queryKey: queryKeyFactory.post(id), 
        queryFn: () => fetchPost(id),
        enabled: !!id
    })
}

export default usePostQuery